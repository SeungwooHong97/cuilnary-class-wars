import { Chefs, Restaurant } from "@/types/info";
import Image from "next/image";
import Link from "next/link";

type Props = {
  rest: Restaurant;
  data: Chefs;
};

const RestaurantCard = ({ rest, data }: Props) => {
  return (
    <div key={rest.id}>
      <Link href={`/${data.chef_name}/${rest.restaurant_name}`} className="flex items-center gap-[15px]">
        <Image
          src={
            rest.restaurant_img_url ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
          }
          alt={data.chef_name}
          width={60}
          height={60}
        />
        <div className="flex flex-col">
          <h2 className="font-bold">{rest.restaurant_name}</h2>
          <div className="flex gap-[10px] items-center">
            <p className="font-bold">⭐{rest.star}</p>
            <p className="text-sm font-light">{rest.description ?? "정보 없음"}</p>●
            <p className="text-sm font-light">{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
