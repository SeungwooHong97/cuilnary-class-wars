import { Restaurant } from "@/types/info";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Props = {
  restaurants: Restaurant[];
  setSortedRestaurants: Dispatch<SetStateAction<Restaurant[]>>;
};
export default function SortDropdown({ restaurants, setSortedRestaurants }: Props) {
  const sortByHangul = () => {
    const sorted = [...restaurants].sort((a, b) => a.restaurant_name.localeCompare(b.restaurant_name));
    setSortedRestaurants(sorted);
  };
  const sortByStar = () => {
    const sorted = [...restaurants].sort((a, b) => a.star - b.star);
    setSortedRestaurants(sorted);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "hangul") {
      sortByHangul();
    } else if (e.target.value === "review") {
      sortByStar();
    } else {
      setSortedRestaurants(restaurants);
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="default">기본 순</option>
      <option value="hangul">가나다 순</option>
      <option value="star">별점 순</option>
    </select>
  );
}
