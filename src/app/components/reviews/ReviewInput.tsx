"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import React, { SetStateAction, useState } from "react";

const ReviewInput = ({
  rest,
  setReviews
}: {
  rest: Restaurant;
  setReviews: React.Dispatch<SetStateAction<Review[]>>;
}) => {
  const [comment, setComment] = useState<string>("");
  const [star, setStar] = useState<string>("");

  const addComment = async () => {
    if (!comment) {
      return alert("댓글을 입력해주세요");
    }
    if (!star) {
      return alert("별점을 입력해주세요");
    }

    const { data, error } = await supabase.from("reviews").insert({
      // user_id: ,
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
      setStar("");
    }
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

      <input
        type="text"
        placeholder="평점을 남겨주세요"
        value={star}
        onChange={(e) => {
          setStar(e.target.value);
        }}
      />

      <button onClick={addComment}>등록</button>
    </div>
  );
};

export default ReviewInput;
