"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Bookmark } from "@/types/info";
import { Restaurant } from "@/types/info";
import HeartIconLike from "../../../../public/icons/heart-svgrepo-com-like.svg";
import Image from "next/image";
import Link from "next/link";

export default function Bookmark() {
  const { userId, isLoggedIn } = useAuthStore();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    // 사용자의 찜한(좋아요)누른 식당의 리스트를 가져온다.
    const getBookmark = async () => {
      if (!userId) {
        return; // userId가 유효하지 않으면 함수 종료
      }

      const { data, error } = await supabase.from("bookmark").select("restaurant(*)").eq("user_id", userId);

      if (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("북마크 데이터를 불러오는데 실패했습니다.");
      } else if (data) {
        const restaurantsArray = data.map((item) => item.restaurant).flat();
        setRestaurants(restaurantsArray);
      }
    };
    getBookmark();
  }, [userId]);

  const handleLikeClick = async (resName: string | null, resId: string | null) => {
    await supabase.from("bookmark").delete().match({ user_id: userId, restaurant_id: resId });
    toast.success(resName + "찜 목록에서 삭제 완료!");
    setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== resId));
  };

  return (
    <div>
      <div className="p-8 rounded-lg">
        {restaurants.length === 0 || !isLoggedIn ? (
          <div className="text-center text-lg content-center">찜한 식당이 없습니다.</div>
        ) : (
          <div className="flex flex-wrap max-w-screen-lg mx-auto bg-black rounded-lg mt-16 w-full ">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-md m-2 p-5 flex-1 min-w-[200px] max-w-[240px] h-[300px] flex flex-col justify-between"
              >
                <Image
                  src={restaurant.restaurant_img_url?.images[0] || "/images/chef_basic.png"}
                  alt={restaurant.id}
                  width={240}
                  height={160}
                  className="rounded-lg object-cover h-[160px] w-full"
                />
                <HeartIconLike
                  onClick={() => handleLikeClick(restaurant.restaurant_name, restaurant.id)}
                  className="cursor-pointer w-6 h-6 object-bottom"
                />

                <h3 className="text-xl font-semibold">
                  <Link href={`/${restaurant.chef_name}/${restaurant.restaurant_name}`}>
                    {restaurant.restaurant_name}
                  </Link>
                </h3>

                <p>
                  <Link href={`/${restaurant.chef_name}`}>{restaurant.chef_name}</Link>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
