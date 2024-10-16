import { Restaurant } from "@/types/info";
import React from "react";

const RestaurantHeader = async ({ rest }: { rest: Restaurant }) => {
  console.log("이거", rest);
  return (
    <div className="bg-black text-white">
      <h1>{rest.restaurant_name}</h1>
      <h3>{rest.chef_name} </h3>
      <p>{rest.description}</p>
    </div>
  );
};

export default RestaurantHeader;
