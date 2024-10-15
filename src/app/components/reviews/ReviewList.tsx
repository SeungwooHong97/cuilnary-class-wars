"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import React, { DetailedHTMLProps, InputHTMLAttributes, SetStateAction, useContext, useEffect, useState } from "react";
import ReviewInput from "./ReviewInput";
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
  //  number을 담아도되고 null을 담아도 되고
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [comment, setComment] = useState<any>("");
  const [star, setStar] = useState<any>("");

  useEffect(() => {
    console.log("rest", rest);

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

  return (
    <div>
      {reviews.map((review, index) => {
        return (
          <div key={review.id}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={star}
                  onChange={(e) => {
                    setStar(e.target.value);
                  }}
                />
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button onClick={() => changeReview(review)}>완료</button>
              </div>
            ) : (
              <div>
                <p>{review.star}</p>
                <p>{review.review_content}</p>
              </div>
            )}

            <button
              onClick={() => {
                setEditIndex(index);
                setStar(review.star);
                setComment(review.review_content);
              }}
            >
              수정
            </button>
            <button onClick={() => deleteReview(review.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};
