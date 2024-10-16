import React from "react";
import { Chefs } from "../../../types/info";
import Image from "next/image";
import RestaurantInfo from "./RestaurantInfo";

const ChefInfo = ({ chef }: { chef: Chefs[] }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-5">
      {chef?.map((c: Chefs) => {
        return (
          <li key={c.id} className="pb-10">
            <Image src={c.chef_img_url ?? "/images/chef_basic.png"} alt={c.chef_name} width={500} height={300} />
            <RestaurantInfo restaurant={c.restaurant[0]} chefName={c.chef_name} />
          </li>
        );
      })}
    </ul>
  );
};

export default ChefInfo;
