"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { User } from "../../../types/info";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";

// 사용자 정보 업데이트 함수
const updateUserProfile = async (userId: string, nickname: string) => {
  const { error } = await supabase
    .from("user")
    .update({ nickname: nickname } as Partial<User>)
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  } else {
    alert("닉네임 변경 완료");
  }
};

export default function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // input 수정 버튼 클릭시 input창에 포커스 되도록 하기 위한 변수
  const inputRef = useRef<HTMLInputElement>(null);
  //useAuthStore를 통한 user Info get
  const { userId, userName, profile_img, nickname, isLoggedIn, setNickname, setUserName, setProfile_img } =
    useAuthStore();

  // "수정" 시 유저 닉네임 input창에 focus
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    if (isLoggedIn) {
      try {
        const fetchUserData = async () => {
          const { data, error } = await supabase
            .from("user")
            .select("user_name, profile_img, nickname")
            .eq("id", userId)
            .single<User>();

          if (error) {
            console.error("사용자 정보 가져오기 실패:", error);
            return;
          }

          if (data != null) {
            setUserName(data.user_name ?? "");
            setProfile_img(data.profile_img ?? "");
            setNickname(data.nickname ?? "");
          }
        };

        fetchUserData();
      } catch (e) {
        console.log(e);
      }
    } else {
      //로그인 하지 않은 사용자 후처리
      console.log(isLoggedIn + "로그인하지 않은 사용자니??");
    }
  }, []);

  const trimmedProfileImg = profile_img.trim();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  //이미지 업로드 기능
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    const file = e.target.files?.[0]; // Optional chaining으로 안전하게 접근
    const sanitizedFileName = file?.name
      .replace(/[^a-zA-Z0-9가-힣._-]/g, "_") // 알파벳, 숫자, 한글, '.', '_', '-' 만 허용
      .replace(/\s+/g, "_"); // 공백을 '_'로 대체

    if (file) {
      const { data, error } = await supabase.storage
        .from("user_profile") // 사용할 버킷 이름
        .upload(`user_profile/${userId}/${sanitizedFileName}`, file, {
          contentType: "image/png"
        });

      if (error) {
        console.error("이미지 업로드 오류:", error);
        return;
      }

      // 파일의 URL 가져오기
      const { data: urlData } = supabase.storage
        .from("user_profile")
        .getPublicUrl(`user_profile/${userId}/${sanitizedFileName}`);

      setProfile_img(urlData.publicUrl);
      fetchUserData(urlData.publicUrl);
    }
  };

  //사용자 프로필 업데이트
  const fetchUserData = async (imgUrl: string) => {
    const { error } = await supabase.from("user").update({ profile_img: imgUrl }).eq("id", userId);

    if (!error) {
      alert("프로필 이미지 변경 완료");
    }
  };

  return (
    <div className="flex items-center my-4 justify-center">
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
        <Image
          src={
            profile_img ||
            "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/sign/user_profile/default_img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyX3Byb2ZpbGUvZGVmYXVsdF9pbWcucG5nIiwiaWF0IjoxNzI4OTMzOTg3LCJleHAiOjE3NjA0Njk5ODd9.zkJMRvGI8vpWKsR1c5nskb88fibWo_uM_lzQJzfZVbk&t=2024-10-14T19%3A26%3A28.430Z"
          }
          alt="user avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="ml-10">
        <h1 className="text-5xl mb-5">
          <span className="text-gray-500 font-bold">{nickname || "익명의 사용자"}님,</span>
          환영합니다.
        </h1>
        <h2 className="text-2xl my-2">
          <span className="text-gray-500 font-bold">이름 : </span>
          {userName || "익명의 사용자"}
        </h2>

        <div className="my-2 flex items-center">
          <h2 className="text-2xl">
            <span className="text-gray-500 font-bold">닉네임 : </span>
            {isEdit ? (
              <input
                className="input w-auto ..."
                maxLength={12}
                ref={inputRef}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                value={nickname}
              ></input>
            ) : (
              nickname || "익명의 사용자"
            )}
          </h2>
          <div
            className="mx-2"
            onClick={() => {
              if (!isEdit) {
                // setNickname(user.nickname);
                // setImgSrc(user.profile_img?  null );
                setIsEdit(true);
              }
            }}
          >
            {isEdit ? null : isLoggedIn ? <span className="button button-2xs ml-1">수정</span> : null}
          </div>
        </div>

        {isEdit ? (
          <div className="my-2 flex items-center">
            <h2 className="text-2xl">
              <input
                type="file"
                className="input ..."
                maxLength={12}
                onChange={(e) => {
                  handleImageChange(e, userId);
                }}
              ></input>
            </h2>
            <div className="mx-2 button" onClick={() => updateUserProfile(userId, nickname)}>
              {isEdit ? "저장" : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
