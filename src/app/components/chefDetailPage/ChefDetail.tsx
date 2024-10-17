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
    <div className="flex flex-col justify-center items-center w-[550px] mt-[30px] mr-[55px] h-[800px] shadow-lg rounded-r-lg gap-3 bg-[#ffffff]">
      <div className="relative w-[450px] h-[201px] rounded-t-lg overflow-hidden">
        <Image src={chefData.chef_img_url} alt={chefData.chef_name} layout="fill" objectFit="cover" />
      </div>
      {chefData.chef_img_url ? null : <h1 className="text-lg font-bold my-[30px]">{chefData.chef_name}</h1>}
      <RestaurantList restaurants={restaurants} data={chefData} handleMoveToLocation={handleMoveToLocation} />
    </div>
  );
}
