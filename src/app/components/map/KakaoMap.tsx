"use client";

import { Restaurant } from "@/types/info";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import ReSetttingMapBounds from "./ReSetttingMapBounds";
import Link from "next/link";

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

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

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
        {restaurants.map((rest, index) => (
          <>
            <MapMarker
              key={`marker__${rest.latitude}-${rest.longitude}-${index}`}
              position={{
                lat: Number(rest.latitude),
                lng: Number(rest.longitude)
              }}
              clickable={true}
              onClick={() => setSelectedRestaurant(rest)}
            />
            {selectedRestaurant?.restaurant_name === rest.restaurant_name && (
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
                    <div className="mb-2">
                      <img
                        src={rest.restaurant_img_url || ""}
                        width="73"
                        height="70"
                        alt={rest.restaurant_name || "이미지 없음"}
                      />
                    </div>
                    <div>
                      <div className="flex gap-[10px] items-center">
                        <p className="text-sm font-light">{rest.address?.split(" ").slice(0, 2).join(" ")}</p>
                        <Link
                          href={`https://map.kakao.com/link/search/${encodeURIComponent(rest.restaurant_name)}`}
                          passHref
                        >
                          <span className="text-xs">상세보기</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomOverlayMap>
            )}
          </>
        ))}
        {points.length > 0 && <ReSetttingMapBounds points={points} />}
      </Map>
    </>
  );
}
