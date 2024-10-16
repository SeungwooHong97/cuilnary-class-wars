/** @type {import('next').NextConfig} */
const nextConfig = {
  //   reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.kakaocdn.net",
        port: "",
        pathname: "/cthumb/local/**"
      }
    ],
    domains: ["ugc-images.catchtable.co.kr", "encrypted-tbn0.gstatic.com", "mjhcmaqftsbfevquhyqc.supabase.co"]
  }
};

export default nextConfig;
