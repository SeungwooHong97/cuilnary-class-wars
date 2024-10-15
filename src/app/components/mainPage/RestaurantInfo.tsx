import { Restaurant } from "@/types/info";
import Image from "next/image";
import React from "react";

type RestaurantPropsType = {
  restaurant: Restaurant;
  chefName: string;
};

const RestaurantInfo = ({ restaurant, chefName }: RestaurantPropsType) => {
  return (
    <div className="px-7 ">
      <div className="flex bg-stone-200	">
        <Image
          src={
            restaurant?.restaurant_img_url ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
          }
          alt={chefName}
          width={60}
          height={60}
        />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2 className="font-bold">{restaurant?.restaurant_name}</h2>
            <p className="font-bold">⭐{restaurant?.star}</p>
          </div>
          <p className="text-sm font-light">{restaurant?.description ?? "정보 없음"}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
