"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// 타입 정의
interface RestaurantImgUrl {
  images: string[];
}

interface Restaurant {
  star: number;
  chef_name: string;
  description: string | null;
  restaurant_name: string;
  restaurant_img_url: string[] | RestaurantImgUrl; // 배열 또는 객체 형태
}

// 북마크 타입 정의
interface Bookmark {
  id: string; // 고유 식별자
  restaurant: Restaurant[]; // 레스토랑 배열
}

export default function Bookmark() {
  const { userId, userName, profile_img, nickname, isLoggedIn, setNickname, setUserName, setProfile_img } =
    useAuthStore();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    // 사용자의 찜한(좋아요)누른 식당의 리스트를 가져온다.
    const getBookmark = async () => {
      if (!userId) {
        return; // userId가 유효하지 않으면 함수 종료
      }

      const { data, error } = await supabase
        .from("bookmark")
        .select(
          `
        id,
        restaurant (
          restaurant_name,
          restaurant_img_url,
          star,
          chef_name,
          description
        )
      `
        )
        .eq("user_id", userId);

      if (error) {
        console.error(error);
        return;
      }

      setBookmarks(data as Bookmark[]);
    };
    getBookmark();
  }, [userId]);

  return (
    // <div>
    //   {
    // bookmarks.map((bookmark) => (
    //   <div key={bookmark.id}>
    //     {bookmark.restaurant.map((rest) => (
    //       <div key={rest.restaurant_name}>
    //         <h2>{rest.restaurant_name || "이름 없음"}</h2> {/* restaurant_name 출력 */}
    //         <p>셰프: {rest.chef_name || "이름 없음"}</p>
    //         <p>설명: {rest.description || "설명 없음"}</p>
    //         {Array.isArray(rest.restaurant_img_url) ? (
    //           rest.restaurant_img_url.map((url, index) =>
    //             url ? <img key={index} src={url} alt={`이미지 ${index + 1}`} /> : null
    //           )
    //         ) : (
    //           <img src={rest.restaurant_img_url.images[0]} alt="레스토랑 이미지" />
    //         )
    //         }
    //       </div>
    //     ))}
    //   </div>
    // ))}

    // </div>
    <div>test</div>
  );
}
