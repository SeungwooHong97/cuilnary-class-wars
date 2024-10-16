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
      if (!userId || !rest.id) {
        console.error("userId or restaurant_id is not valid");
        return; // 유효하지 않은 경우 함수를 종료합니다.
      }

      const { count, error } = await supabase
        .from("bookmark")
        .select("*", { count: "exact" })
        .match({ user_id: userId, restaurant_id: rest.id });
      if (error) {
        console.error(error);
      }

      console.log(count);

      if (count !== null && count > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    getLiked();
  }, [userId]);

  return (
    <div>
      {restDetail.restaurant_img_url.images.map((img: string) => {
        return <Image key={img} src={img} alt="이미지 없음" width={250} height={250} />;
      })}
      <h2>{rest.restaurant_name}</h2>
      <p>{rest.star}</p>
      <p>{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
      <p>{rest.description}</p>
      {/* 로그인 여부에 따라 아이콘 렌더링 */}
      {isLoggedIn ? (
        isLiked ? (
          <HeartIcon onClick={handleLikeClick} className="cursor-pointer w-6 h-6" />
        ) : (
          <HeartIconLike onClick={handleLikeClick} className="cursor-pointer w-6 h-6" />
        )
      ) : null}
    </div>
  );
};

export default RestaurantDetail;
