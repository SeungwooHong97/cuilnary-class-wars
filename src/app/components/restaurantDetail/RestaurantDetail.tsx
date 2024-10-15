import { Restaurant } from "@/types/info";
import React from "react";

type Props = {
  params: { restaurantName: string };
};

const RestaurantDetail = ({ rest }: { rest: Restaurant }) => {
  return (
    <div>
      {/* <Image 
        src={restaurantDetail.restaurant_img_url}
        /> */}
      <h2>{rest.restaurant_name}</h2>
      <p>{rest.star}</p>
      <p>{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
      <p>{rest.description}</p>
    </div>
  );
};

export default RestaurantDetail;
