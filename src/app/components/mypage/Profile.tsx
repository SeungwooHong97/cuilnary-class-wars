"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "../../../types/info";
import useAuthStore from "../../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 사용자 정보 업데이트 함수
const updateUserProfile = async (userId: string, nickname: string) => {
  const { error } = await supabase
    .from("user")
    .update({ nickname: nickname } as Partial<User>)
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  } else {
    toast.success("닉네임이 변경되었습니다!.");
  }
};

export default function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
      const fetchUserData = async () => {
        const { data, error } = await supabase
          .from("user")
          .select("user_name, profile_img, nickname")
          .eq("id", userId)
          .single<User>();

        if (error) {
          toast.error("사용자의 정보를 가져오지 못했습니다.");
          return;
        }

        if (data != null) {
          setUserName(data.user_name ?? "");
          setProfile_img(data.profile_img ?? "");
          setNickname(data.nickname ?? "");
        }
      };

      fetchUserData();
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    const file = e.target.files?.[0];

    const filePath = `user_profile/${userId}/${file?.name}`;

    if (file) {
      // 기존 파일 삭제
      await supabase.storage.from("user_profile").remove([filePath]);

      // 새 파일 업로드
      const { error } = await supabase.storage.from("user_profile").upload(filePath, file);

      if (error) {
        toast.error("프로필 업로드 시 오류가 발생했습니다.");
        return;
      }

      const { data: urlData } = supabase.storage.from("user_profile").getPublicUrl(filePath);

      setProfile_img(urlData.publicUrl);
      await fetchUserData(urlData.publicUrl); // 이미지 변경 후 사용자 데이터 업데이트
    }
  };

  const fetchUserData = async (imgUrl: string) => {
    const { error } = await supabase.from("user").update({ profile_img: imgUrl }).eq("id", userId);

    if (!error) {
      // alert("프로필 이미지 변경 완료");
      toast.success("프로필 변경이 완료되었습니다.");
    }
  };

  // 사용자 프로필 업데이트 및 저장 처리
  const handleSave = async () => {
    await updateUserProfile(userId, nickname);
    setIsEdit(false); // 저장 후 수정 모드 해제
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[200px] h-[200px] mr-12	 rounded-full overflow-hidden">
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

      <div className="flex flex-col justify-center">
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
              />
            ) : (
              nickname || "익명의 사용자"
            )}
          </h2>
          <div className="mx-2">
            {isEdit ? (
              <span className="button button-2xs ml-1" onClick={handleSave}>
                저장
              </span>
            ) : (
              isLoggedIn && (
                <span className="button button-2xs ml-1" onClick={() => setIsEdit(true)}>
                  수정
                </span>
              )
            )}
          </div>
        </div>

        {isEdit && (
          <div className="my-2 flex items-center">
            <h2 className="text-2xl">
              <input type="file" className="input ..." onChange={(e) => handleImageChange(e, userId)} />
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
