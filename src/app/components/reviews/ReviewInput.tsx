"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";

import React, { SetStateAction, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";
import { toast } from "react-toastify";

const ReviewInput = ({
  rest,
  reviewList,
  setReviewList
}: {
  rest: Restaurant;
  reviewList: Review[];
  setReviewList: React.Dispatch<SetStateAction<Review[]>>;
}) => {
  const { userId, nickname } = useAuthStore();
  console.log(userId);

  const [comment, setComment] = useState<string>("");
  const [star, setStar] = useState<string>("0");

  const addComment = async () => {
    if (!userId) {
      return toast.error("로그인시 댓글 작성이 가능합니다"), setComment(""), setStar("");
    }

    if (!comment) {
      return toast.error("댓글을 입력해주세요");
    }

    if (star === "0") {
      return toast.error("별점을 입력해주세요");
    }

    const { error } = await supabase.from("reviews").insert({
      user_id: userId,
      restaurant_id: rest.id,
      review_content: comment,
      star: star
    });

    const { error: addStarError } = await supabase
      .from("restaurant")
      .update({
        star: Number(star) + Number(rest.star) / reviewList.length
      })
      .eq("restaurant_name", rest.restaurant_name);

    const { data: listData, error: listError } = await supabase
      .from("reviews")
      .select()
      .eq("restaurant_id", rest.id)
      .returns<Review[]>();

    if (error || !listData || listError || addStarError) {
      toast.error("댓글 등록을 실패하였습니다");
      throw new Error("댓글 등록을 실패하였습니다");
    } else {
      setReviewList(listData);
      toast.success("댓글 등록 성공!");
      setComment("");
      setStar("0");
    }
  };

  const starDataFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStar(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 bg-stone-200 p-4 rounded-lg">
      <div className="flex gap-2">
        <p className="font-bold">{nickname}</p>
        <select className="border w-36 border-gray-300 rounded-lg" name="" id="" onChange={starDataFunc} value={star}>
          <option value="0">별점 선택</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
      <input
        className="h-24 border border-gray-300 rounded-lg"
        type="text"
        placeholder="댓글을 남겨주세요"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button className="bg-black font-bold  py-1 text-white w-16 rounded-lg mx-auto" onClick={addComment}>
        등록
      </button>
    </div>
  );
};

export default ReviewInput;
