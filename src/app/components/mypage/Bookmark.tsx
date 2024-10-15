"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { BookmarkParsingData } from "@/types/info";

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
    };

    getBookmark();
  }, [userId]);
  return (
    <div className="mt-32 grid grid-cols-5 gap-4 w-full">
      {bookmarks.map((bookmark) => {
        return <div key={bookmark.id}>{bookmark.id}</div>;
      })}
    </div>
  );
}
