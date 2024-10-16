import { supabase } from "@/lib/supabaseClient";
import { Restaurant } from "@/types/info";
import Image from "next/image";
import React from "react";

type Props = {
  params: { restaurantName: string };
};

const RestaurantDetail = async ({ rest }: { rest: Restaurant }) => {
  const { data, error } = await supabase.from("restaurant").select().eq("restaurant_name", rest.restaurant_name);

  if (error) {
    console.error("Error:", error.message);
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }

  const restDetail = data[0];

  console.log("restDetail", restDetail);
  return (
    <div>
      {restDetail.restaurant_img_url.images.map((img: string) => {
        return <Image key={img} src={img} alt="이미지 없음" width={250} height={250} />;
      })}
      <h2>{rest.restaurant_name}</h2>
      <p>{rest.star}</p>
      <p>{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
      <p>{rest.description}</p>
    </div>
  );
};

export default RestaurantDetail;
