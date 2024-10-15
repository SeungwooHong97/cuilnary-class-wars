import { Restaurant } from "@/types/info";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

type Props = {
  rest: Restaurant;
  setSelectedRestaurant: Dispatch<SetStateAction<Restaurant | null>>;
};

export default function ClcikOverlay({ rest, setSelectedRestaurant }: Props) {
  return (
    <CustomOverlayMap
      position={{
        lat: Number(rest.latitude),
        lng: Number(rest.longitude)
      }}
      yAnchor={1.4}
    >
      <div className="flex flex-col items-center bg-white border rounded-lg shadow-md p-2 w-[200px]">
        <div className="flex justify-between items-center w-full mb-2">
          <h2 className="text-[13px] font-bold">{rest.restaurant_name}</h2>
          <img
            alt="close"
            width="14"
            height="13"
            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
            className="cursor-pointer"
            onClick={() => setSelectedRestaurant(null)}
          />
        </div>
        <div>
          <div className="flex justify-center mb-2">
            <img src={rest.restaurant_img_url?.images[0]} width="100px" height="70px" alt={rest.restaurant_name} />
          </div>
          <div>
            <div className="flex gap-[10px] items-center">
              <p className="text-sm font-light">{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
              <Link href={`https://map.kakao.com/link/search/${encodeURIComponent(rest.restaurant_name)}`} passHref>
                <span className="text-xs"> 카카오 지도</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
}
