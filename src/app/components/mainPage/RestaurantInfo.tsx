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
    <div className="px-[27px]">
      {restaurant === undefined ? (
        <div className="bg-stone-200 border-b rounded-b-lg flex justify-center items-center  h-[167px]">
          <p className="text-neutral-500">식당 정보가 없습니다.</p>
        </div>
      ) : (
        <Link href={`/${chefName}`}>
          <div className="bg-stone-200 border-b rounded-b-lg">
            <div className="flex border-neutral-300 p-4">
              <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                <Image
                  src={restaurant?.restaurant_img_url?.images?.[0] ?? "/images/restaurant_default.png"}
                  alt={chefName}
                  layout="fill" // 부모의 크기에 맞춰 이미지를 채움
                  objectFit="cover" // 이미지 비율을 유지하면서 부모 크기에 맞게 자르기
                />
              </div>
              <div className="flex flex-col p-4 gap-3">
                <div className="flex gap-5">
                  <h2 className="font-bold text-xl">{restaurant?.restaurant_name}</h2>
                  <p className="font-bold">⭐ {restaurant?.star}</p>
                </div>
                <p className="text-sm font-light">{restaurant?.description ?? "정보 없음"}</p>
              </div>
            </div>
            <div className="pb-2 pr-4 flex justify-end text-neutral-500 text-xs">
              <p>{`셰프 식당 더보기 >`}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RestaurantInfo;
