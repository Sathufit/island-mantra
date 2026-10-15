import type { NextConfig } from "next";

const backendHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "").hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      // Product photos uploaded through Medusa admin are served by the backend
      // or Supabase storage, depending on the file module in use.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/**" },
      ...(backendHost
        ? [{ protocol: "https" as const, hostname: backendHost, pathname: "/**" }]
        : []),
    ],
  },
  async redirects() {
    return [
      { source: "/policies/terms", destination: "/terms", permanent: true },
      { source: "/policies/privacy", destination: "/privacy", permanent: true },
      { source: "/policies/shipping", destination: "/shipping-returns", permanent: true },
      { source: "/policies/returns", destination: "/shipping-returns", permanent: true },
      { source: "/policies/size-guide", destination: "/size-guide", permanent: true },
    ];
  },
};

export default nextConfig;
