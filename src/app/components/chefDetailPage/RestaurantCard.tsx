import { Chefs, Restaurant } from "@/types/info";
import Image from "next/image";
import Link from "next/link";

type Props = {
  rest: Restaurant;
  data: Chefs;
  handleMoveToLocation: (lat: number, lng: number) => void;
};

const RestaurantCard = ({ rest, data, handleMoveToLocation }: Props) => {
  const imageUrl = rest.restaurant_img_url?.images?.[0] ?? "/images/restaurant_default.png";

  return (
    <div className="relative flex items-center p-3 bg-white rounded-lg border border-gray-300 transition-shadow hover:shadow-md">
      <Image src={imageUrl} alt={data.chef_name} width={80} height={80} className="rounded-lg" />

      <div className="flex flex-col ml-4">
        <Link
          href={`/${data.chef_name}/${rest.restaurant_name}`}
          className="font-bold text-[#000000] text-lg hover:underline"
        >
          {rest.restaurant_name}
        </Link>
        <div className="flex flex-col gap-[3px]">
          <div className="mt-1 text-gray-600 flex items-center gap-[10px]">
            <p className="font-bold text-sm">⭐{rest.star}</p>
            <p className="text-[13px]">{rest.description ?? "정보 없음"}</p>
          </div>
          <p className="text-[13px] text-gray-500">{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
        </div>
      </div>

      <button
        onClick={() => handleMoveToLocation(Number(rest.latitude), Number(rest.longitude))}
        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
      >
        <Image src={"/images/location.png"} alt="위치 이동" height={20} width={20} />
      </button>
    </div>
  );
};

export default RestaurantCard;
