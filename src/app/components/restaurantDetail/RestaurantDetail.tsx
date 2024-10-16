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

const RestaurantDetail = async ({ rest }: { rest: Restaurant }) => {
  const { userId, isLoggedIn } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [restDetail, setRestDetail] = useState<Restaurant | undefined>();

  useEffect(() => {
    const getRestaurantData = async () => {
      const { data, error } = await supabase
        .from("restaurant")
        .select()
        .eq("restaurant_name", rest.restaurant_name)
        .single();

      if (error) {
        console.error("Error:", error.message);
        toast.error("데이터를 가져오는 데 실패했습니다.");
        return; // 에러 발생 시 함수를 종료
      }

      if (data) {
        console.log(data);
        setRestDetail(data as Restaurant); // 타입 단언
      }
    };

    getRestaurantData();
  }, [rest.restaurant_name]);

  const handleLikeClick = async () => {
    if (isLiked) {
      const response = await supabase.from("bookmark").delete().match({ user_id: userId, restaurant_id: rest.id });

      if (response.error) {
        toast.error("찜 목록에서 삭제 실패");
      } else {
        toast.success(rest.restaurant_name + "찜 목록에서 삭제 완료!");
      }
      setIsLiked(false);
    } else {
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
        return;
      }

      const { count, error } = await supabase
        .from("bookmark")
        .select("*", { count: "exact" })
        .match({ user_id: userId, restaurant_id: rest.id });

      if (error) {
        console.error(error);
        return; // 에러 발생 시 함수를 종료
      }

      setIsLiked(count !== null && count > 0);
    };

    getLiked();
  }, [userId, rest.id]);

  return (
    <div>
      {restDetail ? (
        <>
          {restDetail.restaurant_img_url &&
          restDetail.restaurant_img_url.images &&
          restDetail.restaurant_img_url.images.length > 0 ? (
            restDetail.restaurant_img_url.images.map((img: string) => (
              <Image key={img} src={img} alt="이미지 없음" width={250} height={250} />
            ))
          ) : (
            <p>이미지가 없습니다.</p> // 이미지가 없는 경우 처리
          )}
          <h2>{restDetail.restaurant_name}</h2>
          <p>{restDetail.star}</p>
          <p>{restDetail.address?.split(" ").slice(0, 2).join(" ")}</p>
          <p>{restDetail.description}</p>
          {isLoggedIn ? (
            isLiked ? (
              <HeartIcon onClick={handleLikeClick} className="cursor-pointer w-6 h-6" />
            ) : (
              <HeartIconLike onClick={handleLikeClick} className="cursor-pointer w-6 h-6" />
            )
          ) : null}
        </>
      ) : (
        <p>레스토랑 정보를 로딩 중입니다...</p> // 로딩 중 메시지
      )}
    </div>
  );
};

export default RestaurantDetail;
