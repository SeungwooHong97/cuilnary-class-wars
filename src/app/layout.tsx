import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";
import ReactQueryProviders from "./utils/ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "흑백요리사 : 셰프들의 가게",
  description: "흑백요리사 : 셰프들의 가게"
};

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
const KAKAO_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProviders>
          <Script src={KAKAO_API_URL} strategy="lazyOnload" />
          <Header />
          <div className="mt-[56px]">{children}</div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
