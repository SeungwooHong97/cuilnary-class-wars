"use client";
import React, { useEffect } from "react";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Bookmark() {
  const { userId } = useAuthStore();

  // const [bookmarks, setBookmarks] = useState<CustomBookmark[]>([]);

  useEffect(() => {
    // 사용자의 찜한(좋아요)누른 식당의 리스트를 가져온다.
    const getBookmark = async () => {
      if (!userId) {
        return; // userId가 유효하지 않으면 함수 종료
      }
      const {data, error} = await supabase
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
        console.error("Error fetching bookmarks:", error);
        toast.error("북마크 데이터를 불러오는데 실패했습니다.");
      } else if (data) {
        console.log(data);
        // setBookmarks(data);
        // console.log(bookmarks[0].restaurant);
      }
    };
    getBookmark();
  }, [userId]);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
