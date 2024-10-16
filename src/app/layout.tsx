import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";
import ReactQueryProviders from "./utils/ReactQueryProvider";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900"
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900"
// });

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.subset.woff2",
      weight: "400"
    },
    {
      path: "./fonts/Pretendard-Bold.subset.woff2",
      weight: "700"
    }
  ],
  variable: "--font-pretendard"
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
      <body className={`${pretendard.variable} antialiased`}>
        <ToastContainer position="top-right" autoClose={1000} closeOnClick draggable transition={Bounce} />
        <ReactQueryProviders>
          <Script src={KAKAO_API_URL} strategy="beforeInteractive" />
          <Header />
          <main className="mt-[56px]">{children}</main>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
