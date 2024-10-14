"use client";

import { Restaurant } from "@/types/info";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ReSetttingMapBounds from "./ReSetttingMapBounds";

type Props = {
  restaurants: Restaurant[];
};

export default function KakaoMap({ restaurants }: Props) {
  const [points, setPoints] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([]);

  useEffect(() => {
    const newPoints = restaurants
      .filter((rest) => rest.latitude && rest.longitude)
      .map((rest) => ({
        lat: Number(rest.latitude),
        lng: Number(rest.longitude)
      }));
    setPoints(newPoints);
  }, [restaurants]);

  return (
    <>
      <Map
        id="map"
        center={{ lat: 36.463648328911795, lng: 128.17089555281063 }}
        style={{ width: "800px", height: "800px" }}
        level={13}
      >
        {points.map((point, index) => (
          <MapMarker key={`marker__${point.lat}-${point.lng}-${index}`} position={point} />
        ))}
        {points.length > 0 && <ReSetttingMapBounds points={points} />}
      </Map>
    </>
  );
}
