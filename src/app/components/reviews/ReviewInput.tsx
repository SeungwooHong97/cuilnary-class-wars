"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";

import React, { SetStateAction, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";

const ReviewInput = ({
  rest,
  setReviews
}: {
  rest: Restaurant;
  setReviews: React.Dispatch<SetStateAction<Review[]>>;
}) => {
  const { userId } = useAuthStore();
  console.log(userId);

  const [comment, setComment] = useState<string>("");
  const [star, setStar] = useState<string>("0");

  const addComment = async () => {
    if (!userId) {
      return alert("로그인시 댓글 작성이 가능합니다"), setComment(""), setStar("");
    }

    if (!comment) {
      return alert("댓글을 입력해주세요");
    }

    if (star === "0") {
      return alert("별점을 입력해주세요");
    }

    const { error } = await supabase.from("reviews").insert({
      user_id: userId,
      restaurant_id: rest.id,
      review_content: comment,
      star: star
    });

    const { data: listData, error: listError } = await supabase
      .from("reviews")
      .select()
      .eq("restaurant_id", rest.id)
      .returns<Review[]>();

    if (error || !listData || listError) {
      alert("댓글 등록을 실패하였습니다");
      throw new Error("댓글 등록을 실패하였습니다");
    } else {
      setReviews(listData);
      alert("댓글 등록 성공!");
      setComment("");
      setStar("0");
    }
  };

  const starDataFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStar(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="댓글을 남겨주세요"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <select name="" id="" onChange={starDataFunc} value={star}>
        <option value="0">별점을 추가해주세요</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>

      <button onClick={addComment}>등록</button>
    </div>
  );
};

export default ReviewInput;
