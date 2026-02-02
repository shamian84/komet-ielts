// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.pravatar.cc",
//         port: "",
//         pathname: "/**",
//       },
//       // Keep your other patterns if you have them (e.g. for noise background)
//       {
//         protocol: "https",
//         hostname: "grainy-gradients.vercel.app",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript/ESLint ignore settings are now handled via 
  // CLI flags or separate config files in Next 16.
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "grainy-gradients.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // This helps those 2-core Vercel machines by only loading 
    // the icons/animations you actually use.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;