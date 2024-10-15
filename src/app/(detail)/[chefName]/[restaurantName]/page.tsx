import KakaoMap from "@/app/components/map/KakaoMap";
import RestaurantDetail from "@/app/components/restaurantDetail/RestaurantDetail";

import ReviewInput from "@/app/components/reviews/ReviewInput";
import { ReviewList } from "@/app/components/reviews/ReviewList";
import Reviews from "@/app/components/reviews/Reviews";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import Image from "next/image";
import { ContextType, useState } from "react";

type Props = {
  params: { restaurantName: string };
};

const restaurantDetail = async ({ params }: Props) => {
  const decodedRestaurantName = decodeURIComponent(params.restaurantName);
  const { data, error } = await supabase.from("restaurant").select().eq("restaurant_name", decodedRestaurantName);

  if (error) {
    console.error("Error", error.message);
    throw new Error("레스토랑 정보를 가져오는데 실패했습니다");
  }

  const restaurantDetail = data[0];

  return (
    <div>
      <div>
        <RestaurantDetail rest={restaurantDetail} />
        <KakaoMap restaurants={data} selectedLocation={null} />
      </div>
      <Reviews rest={restaurantDetail} />
    </div>
  );
};

export default restaurantDetail;
