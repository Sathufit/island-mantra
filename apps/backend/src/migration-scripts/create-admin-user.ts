import { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createUsersWorkflow } from "@medusajs/medusa/core-flows"

// Runs once (migration scripts are tracked and never re-run) to create the
// production admin user, since the free Render plan doesn't support the CLI
// `medusa user` command via SSH/jobs. Reads credentials from env vars rather
// than hardcoding them — skips entirely if they aren't set, so this is a
// no-op on any environment that doesn't define them (e.g. local dev, which
// already has its own admin user created via the CLI).
export default async function create_admin_user({
  container,
}: {
  container: MedusaContainer
}) {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  if (!email || !password) {
    logger.info(
      "Skipping admin user creation — ADMIN_EMAIL/ADMIN_PASSWORD not set."
    )
    return
  }

  const authService = container.resolve(Modules.AUTH)

  const { result: users } = await createUsersWorkflow(container).run({
    input: { users: [{ email }] },
  })
  const user = users[0]

  const { authIdentity, error } = await authService.register("emailpass", {
    body: { email, password },
  })
  if (error) {
    logger.error(`Failed to create admin auth identity: ${error}`)
    return
  }

  await authService.updateAuthIdentities({
    id: authIdentity!.id,
    app_metadata: { user_id: user.id },
  })

  logger.info(`Admin user created: ${email}`)
}
