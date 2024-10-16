import { Restaurant } from "@/types/info";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type RestaurantPropsType = {
  restaurant: Restaurant;
  chefName: string;
};

const RestaurantInfo = ({ restaurant, chefName }: RestaurantPropsType) => {
  return (
    <div className="px-7">
      <div className="bg-stone-200">
        <div className="flex border-solid border-b border-neutral-300">
          <Image
            src={
              // TODO 변경
              // restaurant?.restaurant_img_url ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
            }
            alt={chefName}
            width={100}
            height={100}
          />
          <div className="flex flex-col p-5 gap-3">
            <div className="flex gap-5">
              <h2 className="font-bold text-xl">{restaurant?.restaurant_name}</h2>
              <p className="font-bold">⭐ {restaurant?.star}</p>
            </div>
            <p className="text-sm font-light">{restaurant?.description ?? "정보 없음"}</p>
          </div>
        </div>
        <div className="p-5 flex justify-center text-neutral-500 border-b rounded-b-lg">
          <Link href={`/${chefName}`}>
            <p>{`셰프 식당 더보기 >`}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
