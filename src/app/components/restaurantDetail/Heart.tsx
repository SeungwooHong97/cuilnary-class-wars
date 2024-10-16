"use Client";

import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";
import HeartIcon from "../../../../public/icons/heart-svgrepo-com-like.svg";
import HeartIconLike from "../../../../public/icons/heart-svgrepo-com.svg";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { Restaurant } from "@/types/info";

const Heart = ({ rest }: { rest: Restaurant }) => {
  const { userId, isLoggedIn } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    if (isLiked) {
      //like가 이미 true이면
      const response = await supabase.from("bookmark").delete().match({ user_id: userId, restaurant_id: rest.id });
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
    if (userId !== null && userId !== "") {
      const getLiked = async () => {
        console.log("실행하시고 로그점 .. user id :" + userId + "restaurant_id : " + rest.id + "isLogin" + isLoggedIn);
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
    }
  }, [userId]);

  return (
    <div className="float-right pr-3 pb-1">
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

export default Heart;
