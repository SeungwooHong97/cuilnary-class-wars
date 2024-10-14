"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { User } from "@/app/types/User";

export default function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  // input 수정 버튼 클릭시 input창에 포커스 되도록 하기 위한 변수
  const inputRef = useRef(null);
  // const [imgSrc, setImgSrc] = useState();

  //테스트 값임
  const user: User = {
    id: "test",
    user_name: "hsw",
    profile_img: "/images/default_img.png",
    created_at: new Date().toISOString(), // 현재 시간을 기본값으로 사용
    updated_at: new Date().toISOString(), // 현재 시간을 기본값으로 사용
    email: "default@example.com",
    nickname: "kazesama"
  };

  //   if (isPending) {
  //     return "";
  //   }

  //   if (isError) {
  //     return alert("사용자 정보를 불러오는 중 오류가 발생했습니다.");
  //   }

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

  return (
    <div className="flex items-center my-4 justify-center">
      <Image
        src={user.profile_img || "/images/default_img.png"}
        alt="userImage"
        width={120}
        height={120}
        className="rounded-full mt-2 border border-zinc-400 ... size-60"
      ></Image>

      <div className="ml-10">
        <h1 className="text-5xl mb-5">
          <span className="text-teal-500 font-bold">{user.nickname}님,</span>
          환영합니다.
        </h1>
        <h2 className="text-2xl my-2">
          <span className="text-teal-500 font-bold">ID : </span>
          {user?.id || ""}
        </h2>

        <div className="my-2 flex items-center">
          <h2 className="text-2xl">
            <span className="text-teal-500 font-bold">닉네임 : </span>
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
              user.nickname
            )}
          </h2>
          <div
            className="mx-2"
            onClick={() => {
              if (!isEdit) {
                setNickname(user.nickname);
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
            <div
              className="mx-2 button"
              onClick={() => {
                if (isEdit) {
                  // 저장 모드 일 때 저장 버튼 클릭 시..
                  // const formData = new FormData();
                  // formData.append("avatar", imgSrc);
                  // formData.append("nickname", nickname);
                  // mutate(formData);
                }
              }}
            >
              {isEdit ? "저장" : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
