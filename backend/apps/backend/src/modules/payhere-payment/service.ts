import crypto from "crypto"
import { AbstractPaymentProvider, MedusaError } from "@medusajs/framework/utils"
import type { Logger } from "@medusajs/framework/types"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

type PayHereOptions = {
  merchantId?: string
  merchantSecret?: string
  mode?: "sandbox" | "live"
  returnUrl?: string
  cancelUrl?: string
  notifyUrl?: string
}

type InjectedDependencies = {
  logger: Logger
}

// PayHere is a hosted-checkout + server-to-server IPN provider, not a direct
// card API: initiatePayment hands the storefront a signed checkout payload to
// redirect the customer to, and the real payment outcome only ever arrives via
// the notify_url webhook (see getWebhookActionAndData). Registered in
// medusa-config.ts but not yet added to the region's payment_providers — it
// needs real PAYHERE_MERCHANT_ID/PAYHERE_MERCHANT_SECRET values first, and the
// storefront checkout redirect isn't wired up yet either.
class PayHerePaymentProviderService extends AbstractPaymentProvider<PayHereOptions> {
  static identifier = "payhere"

  protected logger_: Logger
  protected options_: PayHereOptions

  constructor(cradle: InjectedDependencies, options: PayHereOptions) {
    super(cradle, options)
    this.logger_ = cradle.logger
    this.options_ = options
  }

  private assertConfigured() {
    if (!this.options_.merchantId || !this.options_.merchantSecret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayHere is not configured — set PAYHERE_MERCHANT_ID and PAYHERE_MERCHANT_SECRET before using this provider."
      )
    }
  }

  private secretHash(): string {
    return crypto
      .createHash("md5")
      .update(this.options_.merchantSecret ?? "")
      .digest("hex")
      .toUpperCase()
  }

  private checkoutHash(orderId: string, amount: string, currency: string): string {
    return crypto
      .createHash("md5")
      .update(`${this.options_.merchantId}${orderId}${amount}${currency}${this.secretHash()}`)
      .digest("hex")
      .toUpperCase()
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    this.assertConfigured()

    const { amount, currency_code, context } = input
    const orderId = `im_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const formattedAmount = Number(amount).toFixed(2)
    const currency = currency_code.toUpperCase()
    const customer = context?.customer

    return {
      id: orderId,
      status: "pending",
      data: {
        merchant_id: this.options_.merchantId,
        order_id: orderId,
        amount: formattedAmount,
        currency,
        hash: this.checkoutHash(orderId, formattedAmount, currency),
        return_url: this.options_.returnUrl,
        cancel_url: this.options_.cancelUrl,
        notify_url: this.options_.notifyUrl,
        first_name: customer?.first_name ?? "",
        last_name: customer?.last_name ?? "",
        email: customer?.email ?? "",
        phone: customer?.billing_address?.phone ?? "",
        address: customer?.billing_address?.address_1 ?? "",
        city: customer?.billing_address?.city ?? "",
        country: "Sri Lanka",
        sandbox: this.options_.mode !== "live",
      },
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    // PayHere confirms payment asynchronously (customer is redirected to their
    // hosted checkout, then PayHere calls notify_url) — never synchronously at
    // cart-complete time, so this always defers to the webhook.
    return { status: "pending_authorization", data: input.data }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    // PayHere auto-captures on a successful checkout; nothing to trigger here.
    return { data: input.data }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: input.data }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return this.initiatePayment(input)
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return { data: input.data }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // No PayHere refund API call wired up yet — process refunds from the
    // PayHere merchant dashboard for now.
    this.logger_.warn(
      "PayHere refund requested but not automated yet — process it from the PayHere merchant dashboard."
    )
    return { data: input.data }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    // Real status tracking needs the IPN result persisted somewhere (this
    // provider has no data model of its own yet); until then this reports
    // "pending" and relies on the webhook to drive the actual state change.
    return { status: "pending", data: input.data }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const data = payload.data as Record<string, string>
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = data
    const amount = Number(payhere_amount)

    const expectedSig = crypto
      .createHash("md5")
      .update(
        `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${this.secretHash()}`
      )
      .digest("hex")
      .toUpperCase()

    if (expectedSig !== md5sig) {
      this.logger_.warn(`PayHere IPN signature mismatch for order ${order_id}`)
      return { action: "failed", data: { session_id: order_id, amount } }
    }

    // status_code per PayHere: 2 = success, 0 = pending, -1 = canceled, -2 = failed, -3 = chargedback
    if (status_code === "2") {
      return { action: "captured", data: { session_id: order_id, amount } }
    }
    if (status_code === "0") {
      return { action: "pending", data: { session_id: order_id, amount } }
    }
    return { action: "failed", data: { session_id: order_id, amount } }
  }
}

export default PayHerePaymentProviderService
