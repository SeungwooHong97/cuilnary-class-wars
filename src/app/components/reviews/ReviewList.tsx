"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import React, { DetailedHTMLProps, InputHTMLAttributes, SetStateAction, useContext, useEffect, useState } from "react";
import ReviewInput from "./ReviewInput";
import useAuthStore from "../../../../zustand/userStore";

// import { ReviewsContext } from "./ReviewsContext";

// type Props = {
//   res: Restaurant;
// };

export const ReviewList = ({
  rest,
  reviews,
  setReviews
}: {
  rest: Restaurant;
  reviews: Review[];
  setReviews: React.Dispatch<SetStateAction<Review[]>>;
}) => {
  const { userId, nickname } = useAuthStore();
  //  number을 담아도되고 null을 담아도 되고
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [comment, setComment] = useState<any>("");
  const [star, setStar] = useState<string>("0");

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase.from("reviews").select("*").eq("restaurant_id", rest.id);

      if (error) {
        console.error("Error", error.message);
        throw new Error("댓글 정보를 가져오는데 실패했습니다");
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, []);

  const deleteReview = async (reviewId: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

    if (error) {
      console.error("Error", error.message);
      throw new Error("댓글을 삭제하는데 실패했습니다");
    } else {
      setReviews((prev) => {
        return prev.filter((review) => {
          return review.id !== reviewId;
        });
      });
    }
  };

  const changeReview = async (review: Review) => {
    const { error } = await supabase
      .from("reviews")
      .update({ review_content: comment, star: star })
      .eq("id", review.id);

    if (error) {
      console.error("Error", error.message);
      throw new Error("댓글을 수정하는데 실패했습니다");
    } else {
      setReviews((prev) => {
        return prev.map((r) => {
          if (r.id === review.id) {
            return { ...review, review_content: comment, star: star };
          } else {
            return r;
          }
        });
      });
      setEditIndex(null);
    }
  };

  function reviewToStar(starNumber: string) {
    switch (starNumber) {
      case "1":
        return "⭐";

      case "2":
        return "⭐⭐";

      case "3":
        return "⭐⭐⭐";

      case "4":
        return "⭐⭐⭐⭐";

      case "5":
        return "⭐⭐⭐⭐⭐";
    }
  }

  const starDataFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStar(e.target.value);
  };

  const total = reviews.reduce((sum, obj) => sum + Number(obj.star), 0);
  const average = reviews.length > 0 ? (total / reviews.length).toFixed(1) : 0;

  const sortScore = () => {
    const sortedReviews = [...reviews].sort((a, b) => {
      return Number(b.star) - Number(a.star);
    });
    setReviews(sortedReviews);
  };

  const sortRecent = () => {
    const sortedReviews = [...reviews].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
    setReviews(sortedReviews);
  };

  return (
    <div>
      <button onClick={sortRecent}>최신순</button>
      <button onClick={sortScore}>별점순</button>
      <p>댓글수: {reviews.length}</p>
      <p>평점: {average}</p>
      {reviews.map((review, index) => {
        return (
          <div key={review.id}>
            {editIndex === index ? (
              <div>
                <select name="" id="" onChange={starDataFunc} value={star}>
                  <option value="0">별점을 추가해주세요</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />

                <button onClick={() => changeReview(review)}>완료</button>
                <button onClick={() => setEditIndex(null)}>취소</button>
              </div>
            ) : (
              <div>
                <p>{nickname}</p>
                <p>{reviewToStar(review.star!)}</p>
                <p>{review.review_content}</p>
              </div>
            )}
            {userId === review.user_id && (
              <button
                onClick={() => {
                  setEditIndex(index);
                  // type단언 ! 무조건 값이 있다는 단언 무조건 null이 아니다
                  setStar(review.star!);
                  setComment(review.review_content);
                }}
              >
                수정
              </button>
            )}
            {userId === review.user_id && <button onClick={() => deleteReview(review.id)}>삭제</button>}
          </div>
        );
      })}
    </div>
  );
};
