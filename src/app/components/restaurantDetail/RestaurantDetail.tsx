"use client";
import { Restaurant } from "@/types/info";
import Image from "next/image";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Heart from "./Heart";

const RestaurantDetail = ({ rest }: { rest: Restaurant }) => {
  return (
    <div className="rounded-lg border border-gray-300 p-2 mt-6 bg-black text-white">
      <div className="flex gap-3 mb-6">
        {rest?.restaurant_img_url?.images?.map((img: string) => {
          return <Image key={img} src={img} alt="이미지 없음" width={250} height={250} />;
        })}
      </div>
      <div className="pl-2">
        <h1 className="text-3xl font-bold mb-2 gap-1">🍴 {rest.restaurant_name} </h1>
        <p className="mb-4 pl-2">{rest.description}</p>
        <p>📍 {rest.address}</p>
      </div>
      <Heart rest={rest}></Heart>
    </div>
  );
};
export default RestaurantDetail;
