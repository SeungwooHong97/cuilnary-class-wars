"use client";

import React from "react";
import Image from "next/image";

// 임시
const mainImage = [
  "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/sign/culinary-class-wars-image/main-2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjdWxpbmFyeS1jbGFzcy13YXJzLWltYWdlL21haW4tMi5qcGciLCJpYXQiOjE3Mjg4ODk0MjAsImV4cCI6MjA0NDI0OTQyMH0.3jJIRvKZvs4lO0ALKS4UCnefW11CfQb-i-dj9ObjhyI",
  "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/public/culinary-class-wars-image/main-3.jpg",
  "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/public/culinary-class-wars-image/main-4.png",
  "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/sign/culinary-class-wars-image/main-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjdWxpbmFyeS1jbGFzcy13YXJzLWltYWdlL21haW4tMS5wbmciLCJpYXQiOjE3Mjg4ODk0MTcsImV4cCI6MjA0NDI0OTQxN30.RuDH_xiIWHbCPsoB2UUiFl1FBsjpHKcgnB-Ml8OfKRo"
];

const MainImage = () => {
  return (
    <div>
      상단 이미지
      {/* <Image src={mainImage[0]} alt={"메인 이미지"} width={100} height={100} layout="responsive" /> */}
      {/* {mainImage.map((image) => {
        return (
          <div key={image} style={{ width: "100vw" }}>
            <Image src={image} alt={"메인 이미지"} width={500} height={500} />
          </div>
        );
      })} */}
    </div>
  );
};

export default MainImage;
