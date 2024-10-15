import { Restaurant } from "@/types/info";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

type Props = {
  rest: Restaurant;
};

export default function ZoomOverlay({ rest }: Props) {
  return (
    <CustomOverlayMap
      position={{
        lat: Number(rest.latitude),
        lng: Number(rest.longitude)
      }}
      yAnchor={0}
    >
      <div className="bg-white p-1 rounded-md shadow-sm">
        <p className="text-xs">{rest.restaurant_name}</p>
      </div>
    </CustomOverlayMap>
  );
}
