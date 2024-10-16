"use client";

import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Chefs, Restaurant } from "@/types/info";
import SortDropdown from "./SortDropdown";

type Props = {
  restaurants: Restaurant[];
  data: Chefs;
  handleMoveToLocation: (lat: number, lng: number) => void;
};

export default function RestaurantList({ restaurants, data, handleMoveToLocation }: Props) {
  const [restaurant, setRestaurant] = useState("");
  const [debouncedRestaurant, setDebouncedRestaurant] = useState(restaurant);
  const [sortedRestaurants, setSortedRestaurants] = useState(restaurants);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRestaurant(restaurant);
    }, 300);

    return () => clearTimeout(timer);
  }, [restaurant]);

  const filteredRestaurants = debouncedRestaurant
    ? sortedRestaurants.filter((rest) => rest.restaurant_name.toLowerCase().includes(debouncedRestaurant.toLowerCase()))
    : sortedRestaurants;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center mb-[10px] gap-[10px]">
        <SortDropdown restaurants={restaurants} setSortedRestaurants={setSortedRestaurants} />
        <input
          type="text"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          placeholder="레스토랑 검색"
          className="border border-gray-400 rounded-lg p-3 w-[300px] h-[40px] bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-shadow shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-[20px] h-[500px] w-[480px] p-[20px] overflow-y-auto">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((rest) => {
            return <RestaurantCard key={rest.id} rest={rest} data={data} handleMoveToLocation={handleMoveToLocation} />;
          })
        ) : (
          <p>검색된 레스토랑이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
