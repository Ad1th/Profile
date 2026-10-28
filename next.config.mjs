let userConfig = undefined;
try {
  // try to import ESM first
  userConfig = await import("./v0-user-next.config.mjs");
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async redirects() {
    return [
      {
        source: "/renderd",
        destination: "https://renderd.vercel.app",
        permanent: true,
      },
    ];
  },
  // Every page has a markdown twin at its own URL plus ".md", served from
  // app/md (see lib/markdown.ts). beforeFiles, so "/projects/<slug>.md" is
  // not taken for a project slug by the dynamic route first.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/index.md", destination: "/md/index" },
        {
          source: "/:page(about|projects|research).md",
          destination: "/md/:page",
        },
        {
          source: "/:section(projects|patents|hackathons)/:slug.md",
          destination: "/md/:section/:slug",
        },
      ],
    };
  },
};

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig;

  for (const key in config) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      };
    } else {
      nextConfig[key] = config[key];
    }
  }
}

export default nextConfig;
