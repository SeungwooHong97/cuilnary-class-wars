"use client";

import { supabase } from "@/lib/supabaseClient";
import { Restaurant, Review } from "@/types/info";
import React, { useEffect, useState } from "react";

import useAuthStore from "../../../../zustand/userStore";

// import { ReviewsContext } from "./ReviewsContext";

// type Props = {
//   res: Restaurant;
// };

export const ReviewList = ({
  rest,
  reviewList,
  setReviewList
}: {
  rest: Restaurant;
  reviewList: any;
  setReviewList: React.Dispatch<any>;
}) => {
  const { userId } = useAuthStore();
  //  number을 담아도되고 null을 담아도 되고
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [comment, setComment] = useState<any>("");
  const [star, setStar] = useState<string>("0");

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`*,user(id,user_name)`)
        .eq("restaurant_id", rest.id);

      if (error) {
        console.error("Error", error.message);
        throw new Error("댓글 정보를 가져오는데 실패했습니다");
      } else {
        setReviewList(data);
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
      setReviewList((prev) => {
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
      setReviewList((prev) => {
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

  const total = reviewList.reduce((sum, obj) => sum + Number(obj.star), 0);
  const average = reviewList.length > 0 ? (total / reviewList.length).toFixed(1) : 0;

  const sortScore = () => {
    const sortedReviews = [...reviewList].sort((a, b) => {
      return Number(b.star) - Number(a.star);
    });
    setReviewList(sortedReviews);
  };

  const sortRecent = () => {
    const sortedReviews = [...reviewList].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
    setReviewList(sortedReviews);
  };
  console.log("reviewList", reviewList);
  return (
    <div className="bg-stone-200 mt-10 rounded-lg p-4">
      <div className="flex gap-5  border-black border-b text-xl font-bold">
        <p>댓글수: {reviewList.length}개</p>
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

      {reviewList.map((review, index) => {
        return (
          <div key={review.id} className="border-y mt-20 border-zinc-400 p-4">
            {editIndex === index ? (
              <div className="flex flex-col gap-2  p-4 border-zinc-400 ">
                <div className="flex gap-2">
                  <p>{review.user.user_name}</p>

                  <select
                    className="border w-36 border-gray-300 rounded-lg"
                    name=""
                    id=""
                    onChange={starDataFunc}
                    value={star}
                  >
                    <option value="0">별점을 추가해주세요</option>
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
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <div className="flex gap-3 mx-auto">
                  <button
                    className="bg-black py-1 font-bold text-white w-16 rounded-lg "
                    onClick={() => changeReview(review)}
                  >
                    완료
                  </button>
                  <button
                    className="bg-black  font-bold py-1 text-white w-16 rounded-lg "
                    onClick={() => setEditIndex(null)}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2  pt-1">
                  <p className="font-medium"> {review?.user?.user_name}</p>
                  <p>{reviewToStar(review.star!)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="pt-1"> {review.review_content}</p>
                  {userId === review.user_id && (
                    <div className="flex gap-2 float-right pr-6 ">
                      <button
                        className="border border-zinc-400 rounded-lg px-1 "
                        onClick={() => {
                          setEditIndex(index);
                          // type단언 ! 무조건 값이 있다는 단언 무조건 null이 아니다
                          setStar(review.star!);
                          setComment(review.review_content);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="border border-zinc-400 rounded-lg px-1 "
                        onClick={() => deleteReview(review.id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
