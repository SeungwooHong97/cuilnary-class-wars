"use client";
import { Restaurant } from "@/types/info";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HeartIcon from "../../../../public/icons/heart-svgrepo-com-like.svg";
import HeartIconLike from "../../../../public/icons/heart-svgrepo-com.svg";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RestaurantDetail = ({ rest }: { rest: Restaurant }) => {
  const { userId, isLoggedIn } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    if (isLiked) {
      //like가 이미 true이면
      const response = await supabase.from("bookmark").delete().match({ user_id: userId, restaurant_id: rest.id });
      console.log(response);
      toast.success(rest.restaurant_name + "찜 목록에서 삭제 완료!");
      setIsLiked(false);
    } else {
      //like가 false이면
      const { error } = await supabase.from("bookmark").insert({ user_id: userId, restaurant_id: rest.id });
      if (error) {
        toast.error(rest.restaurant_name + "찜 등록 실패");
        console.log(error);
      } else {
        toast.success(rest.restaurant_name + "찜 등록 완료!");
        setIsLiked(true);
      }
    }
  };

  useEffect(() => {
    const getLiked = async () => {
      console.log("실행하시고 로그점 .. user id :" + userId + "restaurant_id : " + rest.id);
      const { count, error } = await supabase
        .from("bookmark")
        .select("*", { count: "exact" })
        .match({ user_id: userId, restaurant_id: rest.id });
      if (error) {
        console.error(error);
      }
      if (count !== null && count > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };
    getLiked();
  }, [userId]);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="rounded-lg border border-gray-300 p-2 mt-6 bg-black text-white">
      <div className="flex gap-3 mb-6 h-1/2">
        {rest?.restaurant_img_url?.images.map((img: string) => {
          return <Image key={img} src={img} alt="이미지 없음" width={250} height={250} />;
        })}
      </div>
      <div className="pl-2">
        <h1 className="text-3xl font-bold mb-2 gap-1">🍴 {rest.restaurant_name} </h1>
        <p className="mb-4 pl-2">{rest.description}</p>
        <p>📍 {rest.address}</p>
      </div>

      {/* 로그인 여부에 따라 아이콘 렌더링 */}
      <div className="pr-0 w-full">
        {isLoggedIn ? (
          isLiked ? (
            <HeartIcon onClick={handleLikeClick} className="cursor-pointer w-6 h-6 pr-0" />
          ) : (
            <HeartIconLike onClick={handleLikeClick} className="cursor-pointer w-6 h-6 pr-0" />
          )
        ) : null}
      </div>
    </div>
  );
};
export default RestaurantDetail;
