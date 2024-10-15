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
    <div className="flex justify-between items-center">
      <Link href={`/${data.chef_name}/${rest.restaurant_name}`} className="flex items-center gap-[15px]">
        <Image src={imageUrl} alt={data.chef_name} width={60} height={60} />

        <div className="flex flex-col">
          <h2 className="font-bold">{rest.restaurant_name}</h2>
          <div className="flex gap-[10px] items-center">
            <p className="font-bold">⭐{rest.star}</p>
            <p className="text-sm font-light">{rest.description ?? "정보 없음"}</p>|
            <p className="text-sm font-light">{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
          </div>
        </div>
      </Link>
      <button onClick={() => handleMoveToLocation(Number(rest.latitude), Number(rest.longitude))}>
        <Image src={"/images/location.png"} alt="위치 이동" height={25} width={25} />
      </button>
    </div>
  );
};

export default RestaurantCard;
