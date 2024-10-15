"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { BookmarkParsingData } from "@/types/info";
import Image from "next/image";

export default function Bookmark() {
  const { userId, userName, profile_img, nickname, isLoggedIn, setNickname, setUserName, setProfile_img } =
    useAuthStore();

  const [bookmarks, setBookmarks] = useState<BookmarkParsingData[]>([]);

  useEffect(() => {
    // 사용자의 찜한(좋아요)누른 식당의 리스트를 가져온다.
    const getBookmark = async () => {
      if (!userId) {
        console.error("유효하지 않은 userId:", userId);
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
      setBookmarks(data as BookmarkParsingData[]);
      console.log(data);
    };

    getBookmark();
  }, [userId]);



  return (
    <div className="mt-32 grid grid-cols-5 gap-4 w-full">
      {bookmarks.map((bookmark) => {
        const imageUrl =
        bookmark.restaurant.restaurant_img_url &&
        bookmark.restaurant.restaurant_img_url[0]
          ? bookmark.restaurant.restaurant_img_url[0] // 첫 번째 이미지 URL 사용
          : "/default-image.png"; // 이미지가 없을 경우 기본 이미지


        return ( <div key={bookmark.id} className="border-2 rounded p-4 shadow flex hover:shadow-lg justify-center items-center flex-col">
         <Image
          src={bookmark.restaurant.restaurant_img_url[0]}
          alt={bookmark.restaurant.}
          width={120}
          height={120}
          className="rounded"
        ></Image>
         <h3 className="mt-2 text-center ">{bookmark.id}</h3>
         {/* <h3 className="mt-2 text-center text-orange-600">{champion.title}</h3> */}
          </div>
        );
          
      })}
    </div>
  );
}
