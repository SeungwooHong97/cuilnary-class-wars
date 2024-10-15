"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { User } from "../../../types/info";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";

//이미지 업로드 기능
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // Optional chaining으로 안전하게 접근

  if (file) {
    const objectUrl = URL.createObjectURL(file); // 파일을 URL로 변환
    const imgElement = document.getElementById("imgPrev") as HTMLImageElement | null;

    if (imgElement) {
      imgElement.src = objectUrl; // imgElement가 null이 아닌 경우에만 src 설정
    }

    // setImgSrc(file); // 파일을 상태로 설정
  }
};

// 사용자 정보 업데이트 함수
const updateUserProfile = async (userId: string, nickname: string) => {
  const { data, error } = await supabase
    .from("user")
    .update({ nickname: nickname } as Partial<User>)
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  alert("성공적으로 닉네임 변ㄱ");
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

  return (
    <div className="flex items-center my-4 justify-center">
      <Image
        src={
          profile_img
            ? profile_img
            : "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/sign/user_profile/default_img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyX3Byb2ZpbGUvZGVmYXVsdF9pbWcucG5nIiwiaWF0IjoxNzI4OTMzOTg3LCJleHAiOjE3NjA0Njk5ODd9.zkJMRvGI8vpWKsR1c5nskb88fibWo_uM_lzQJzfZVbk&t=2024-10-14T19%3A26%3A28.430Z"
        }
        alt="userImage"
        width={150}
        height={150}
        quality={100}
        className="rounded-full mt-2 border border-zinc-400"
      />

      <div className="ml-10">
        <h1 className="text-5xl mb-5">
          <span className="text-gray-500 font-bold">{nickname}님,</span>
          환영합니다.
        </h1>
        <h2 className="text-2xl my-2">
          <span className="text-gray-500 font-bold">이름 : </span>
          {userName || ""}
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
              nickname
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
            {isEdit ? null : <span className="button button-2xs ml-1">수정</span>}
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
                  handleImageChange(e);
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
