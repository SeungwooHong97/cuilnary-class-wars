"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ChefInfo from "./ChefInfo";
import CategoryButton from "./CategoryButton";
import { Chefs } from "../../../types/info";

const ChefList = () => {
  const [category, setCategory] = useState("백수저");
  const [whiteChef, setWhiteChef] = useState<Chefs[]>([]);
  const [blackChef, setBlackChef] = useState<Chefs[]>([]);

  const whiteScrollRef = useRef<HTMLHeadingElement | null>(null); // 백수저 ref
  const blackScrollRef = useRef<HTMLHeadingElement | null>(null); // 흑수저 ref

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

  const handleMoveScroll = (buttonType: string) => {
    setCategory(buttonType);

    if (buttonType === "백수저") {
      whiteScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (buttonType === "흑수저") {
      blackScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <section className="flex justify-around mb-8">
        <CategoryButton onClick={handleMoveScroll} buttonType={"백수저"} category={category} />
        <CategoryButton onClick={handleMoveScroll} buttonType={"흑수저"} category={category} />
      </section>
      <section>
        <h2 className="text-2xl font-bold text-center mb-4" ref={whiteScrollRef}>
          백수저
        </h2>
        <ChefInfo chef={whiteChef} />

        <h2 className="text-2xl font-bold text-center mb-4" ref={blackScrollRef}>
          흑수저
        </h2>
        <ChefInfo chef={blackChef} />
      </section>
    </div>
  );
};

export default ChefList;
