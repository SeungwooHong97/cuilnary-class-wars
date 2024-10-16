import Image from "next/image";
import RestaurantList from "./RestaurantList";
import { Chefs, Restaurant } from "@/types/info";

type Props = {
  chefData: Chefs;
  restaurants: Restaurant[];
  handleMoveToLocation: (lat: number, lng: number) => void;
};

export default function ChefDetail({ chefData, restaurants, handleMoveToLocation }: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-[550px] h-[800px] shadow-lg rounded-r-lg  gap-6 bg-[#ffffff]">
      <Image src={chefData.chef_img_url} alt={chefData.chef_name} width={480} height={261} objectFit="cover" />
      {chefData.chef_img_url ? null : <h1 className="text-lg font-bold my-[30px]">{chefData.chef_name}</h1>}
      <RestaurantList restaurants={restaurants} data={chefData} handleMoveToLocation={handleMoveToLocation} />
    </div>
  );
}
