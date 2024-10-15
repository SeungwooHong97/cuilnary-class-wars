"use client";

import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Chefs, Restaurant } from "@/types/info";

type Props = {
  restaurants: Restaurant[];
  data: Chefs;
  handleMoveToLocation: (lat: number, lng: number) => void;
};

export default function RestaurantList({ restaurants, data, handleMoveToLocation }: Props) {
  const [restaurant, setRestaurant] = useState("");
  const [debouncedRestaurant, setDebouncedRestaurant] = useState(restaurant);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRestaurant(restaurant);
    }, 300);

    return () => clearTimeout(timer);
  }, [restaurant]);

  const filteredRestaurants = debouncedRestaurant
    ? restaurants.filter((rest) => rest.restaurant_name.toLowerCase().includes(debouncedRestaurant.toLowerCase()))
    : restaurants;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <input
        type="text"
        value={restaurant}
        onChange={(e) => setRestaurant(e.target.value)}
        className="border p-2 w-[300px] mb-4"
      />
      <button></button>
      <div className="flex flex-col gap-[30px] h-[500px] w-[600px] p-[20px] overflow-y-auto">
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
