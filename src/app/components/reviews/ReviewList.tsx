"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
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
  //   const { reviews, setReviews } = useContext(ReviewsContext);

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

  return (
    <div>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <p>{review.review_content}</p>
          </div>
        );
      })}
    </div>
  );
};
