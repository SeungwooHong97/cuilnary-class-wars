import { Restaurant } from "@/types/info";
import React from "react";

const RestaurantHeader = async ({ rest }: { rest: Restaurant }) => {
  return (
    <div className="bg-black text-white w-full pt-8 ps-9 pb-3">
      <h1 className="text-4xl font-bold mb-1 gap-3">🍴{rest.restaurant_name}</h1>
      <p className="ps-2">{rest.description}</p>
    </div>
  );
};

export default RestaurantHeader;
