"use client";

import { Restaurant } from "@/types/info";
import { useState } from "react";

import ReviewInput from "./ReviewInput";
import { ReviewList } from "./ReviewList";

const Reviews = ({ rest }: { rest: Restaurant }) => {
  const [reviewList, setReviewList] = useState<any>([]);

  return (
    <div className=" m-10">
      <ReviewInput rest={rest} reviewList={reviewList} setReviewList={setReviewList} />
      <ReviewList rest={rest} reviewList={reviewList} setReviewList={setReviewList} />
    </div>
  );
};

export default Reviews;
