"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import React, { SetStateAction, useEffect, useState } from "react";

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
        return "⭐ 1점";

      case "2":
        return "⭐⭐ 2점";

      case "3":
        return "⭐⭐⭐ 3점";

      case "4":
        return "⭐⭐⭐⭐ 4점";

      case "5":
        return "⭐⭐⭐⭐⭐ 5점";
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
    <div className="bg-stone-200 mt-10 rounded-lg p-4">
      <div className="flex gap-5  border-black border-b text-xl font-bold">
        <p>댓글수: {reviews.length}개</p>
        <p>평점: {average}점</p>
      </div>
      <div className=" flex float-right text-lg font-bold">
        <button className="m-4 " onClick={sortRecent}>
          ⏱️ 최신순
        </button>
        <button className="mr-8" onClick={sortScore}>
          ⭐ 별점순
        </button>
      </div>

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
              <div className=" mt-20 ">
                <div className="flex gap-2 border-t border-zinc-400">
                  <p className="font-medium">{nickname}</p>
                  <p>{reviewToStar(review.star!)}</p>
                </div>
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
