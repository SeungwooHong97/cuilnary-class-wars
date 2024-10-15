"use client";

import { Restaurant, Review } from "@/types/info";
import React, { useState } from "react";
import ReviewInput from "./ReviewInput";
import { ReviewList } from "./ReviewList";

const Reviews = ({ rest }: { rest: Restaurant }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  return (
    <div>
      <ReviewInput rest={rest} setReviews={setReviews} />
      <ReviewList rest={rest} reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default Reviews;
