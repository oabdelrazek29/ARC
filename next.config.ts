import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/learn", destination: "/dashboard", permanent: true },
      { source: "/learn/create", destination: "/courses/create", permanent: true },
      { source: "/learn/courses", destination: "/courses", permanent: true },
      { source: "/learn/tutor", destination: "/tutor", permanent: true },
      { source: "/learn/notes", destination: "/notes", permanent: true },
      { source: "/learn/files", destination: "/files", permanent: true },
      { source: "/learn/teacher", destination: "/courses", permanent: true },
      { source: "/learn/:path*", destination: "/dashboard", permanent: true },
      { source: "/cognitive", destination: "/dashboard", permanent: true },
      { source: "/cognitive/:path*", destination: "/dashboard", permanent: true },
      { source: "/companions", destination: "/dashboard", permanent: true },
      { source: "/companions/:path*", destination: "/dashboard", permanent: true },
      { source: "/classic", destination: "/", permanent: true },
      { source: "/goals/new", destination: "/courses/create", permanent: true },
      { source: "/trees/:id", destination: "/courses/:id", permanent: true },
      { source: "/my-journey", destination: "/dashboard", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
