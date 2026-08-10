// Pings the Medusa backend on a schedule so Render's free tier never lets it
// idle long enough to spin down (idle instances cold-start in 30-60s, which
// is longer than Netlify's function timeout and causes the site's SSR
// requests to time out — see medusaFetch's timeout in src/lib/medusa/client.ts).
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

export default async () => {
  if (!BACKEND_URL) return;
  await fetch(new URL("/health", BACKEND_URL)).catch(() => {});
};

export const config = {
  schedule: "*/10 * * * *",
};
