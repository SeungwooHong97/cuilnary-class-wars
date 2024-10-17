"use client";

import { Restaurant, Review, ReviewWithUser } from "@/types/info";
import React, { useState } from "react";

import { ReviewList } from "./ReviewList";
import ReviewInput from "./ReviewInput";

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
