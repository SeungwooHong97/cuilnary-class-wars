import React from "react";
import { Chefs } from "../../../types/info";
import Image from "next/image";
import Link from "next/link";
import RestaurantInfo from "./RestaurantInfo";

const ChefInfo = ({ chef }: { chef: Chefs[] }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-5">
      {chef?.map((c: Chefs) => {
        return (
          <li key={c.id} className="pb-10">
            <Link href={`/${c.chef_name}`}>
              <Image
                src={
                  c.chef_img_url ??
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
                }
                alt={c.chef_name}
                width={500}
                height={300}
              />
            </Link>

            <RestaurantInfo restaurant={c.restaurant[0]} chefName={c.chef_name} />
          </li>
        );
      })}
    </ul>
  );
};

export default ChefInfo;
