"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ChefInfo from "./ChefInfo";
import CategoryButton from "./CategoryButton";
import { Chefs } from "../../../types/info";
import Image from "next/image";

const ChefList = () => {
  const [whiteChef, setWhiteChef] = useState<Chefs[]>([]);
  const [blackChef, setBlackChef] = useState<Chefs[]>([]);
  const [isVisibleTopButton, setIsVisibleButton] = useState<boolean>(false);

  const whiteScrollRef = useRef<HTMLHeadingElement | null>(null); // 백수저 ref
  const blackScrollRef = useRef<HTMLHeadingElement | null>(null); // 흑수저 ref

  const categoryRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const getChefs = async () => {
      const { data, error } = await supabase.from("chef").select("*, restaurant(*)");

      if (error) {
        console.error("Error:", error.message);
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }

      if (data) {
        const whiteChefs = data.filter((chef: Chefs) => chef.chef_class === "white");
        const blackChefs = data.filter((chef: Chefs) => chef.chef_class === "black");
        setWhiteChef(whiteChefs);
        setBlackChef(blackChefs);
      }
    };
    getChefs();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisibleButton(false);
      } else {
        setIsVisibleButton(true);
      }
    });

    const topButtonObserver = whiteScrollRef;
    observer.observe(topButtonObserver.current!);
  }, []);

  const handleMoveScroll = (buttonType: string) => {
    if (buttonType === "백수저") {
      const targetPosition = whiteScrollRef.current!.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - 90, // 높이 조정
        behavior: "smooth"
      });
    } else if (buttonType === "흑수저") {
      const targetPosition = blackScrollRef.current!.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - 90, // 높이 조정
        behavior: "smooth"
      });
    }
  };

  const handleMoveScrollTop = () => {
    categoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <section className="flex justify-around mb-8" ref={categoryRef}>
        <CategoryButton onClick={handleMoveScroll} buttonType={"백수저"} />
        <CategoryButton onClick={handleMoveScroll} buttonType={"흑수저"} />
      </section>
      <section>
        <h2 className="text-2xl font-bold text-center mb-4 mt-16" ref={whiteScrollRef}>
          백수저
        </h2>
        <ChefInfo chef={whiteChef} />

        <h2 className="text-2xl font-bold text-center mb-4 mt-16" ref={blackScrollRef}>
          흑수저
        </h2>
        <ChefInfo chef={blackChef} />
      </section>
      <button
        className={`fixed bottom-10 right-10 rounded cursor-pointer ${isVisibleTopButton ? "block" : "hidden"} `}
        onClick={handleMoveScrollTop}
      >
        <Image src={"/images/topButton.svg"} alt={"탑 버튼"} width={50} height={50} />
      </button>
    </div>
  );
};

export default ChefList;
