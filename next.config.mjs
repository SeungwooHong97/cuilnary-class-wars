/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.kakaocdn.net",
        port: "",
        pathname: "/cthumb/local/**"
      }
    ],

    domains: [
      "ugc-images.catchtable.co.kr",
      "encrypted-tbn0.gstatic.com",
      "mjhcmaqftsbfevquhyqc.supabase.co",
      "img1.kakaocdn.net"
    ]
  }
};

export default nextConfig; // ES 모듈 방식으로 내보내기
