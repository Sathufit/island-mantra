import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/payhere-payment",
            id: "payhere",
            options: {
              merchantId: process.env.PAYHERE_MERCHANT_ID,
              merchantSecret: process.env.PAYHERE_MERCHANT_SECRET,
              mode: process.env.PAYHERE_MODE ?? "sandbox",
              returnUrl: process.env.PAYHERE_RETURN_URL,
              cancelUrl: process.env.PAYHERE_CANCEL_URL,
              notifyUrl: process.env.PAYHERE_NOTIFY_URL,
            },
          },
        ],
      },
    },
  ],
})
