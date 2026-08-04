import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import PayHerePaymentProviderService from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [PayHerePaymentProviderService],
})
