"use client";

import { Restaurant } from "@/types/info";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import ReSetttingMapBounds from "./ReSetttingMapBounds";
import Link from "next/link";
import RestaurantOverlay from "./RestaurantOverlay";

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
  const [mapLevel, setMapLevel] = useState(13);

  useEffect(() => {
    const newPoints = restaurants
      .filter((rest) => rest.latitude && rest.longitude)
      .map((rest) => ({
        lat: Number(rest.latitude),
        lng: Number(rest.longitude)
      }));
    setPoints(newPoints);
  }, [restaurants]);

  const handleZommChanged = (map: kakao.maps.Map) => {
    setMapLevel(map.getLevel());
  };

  return (
    <>
      <Map
        id="map"
        center={{ lat: 36.463648328911795, lng: 128.17089555281063 }}
        style={{ width: "800px", height: "800px" }}
        level={13}
        onZoomChanged={handleZommChanged}
      >
        {restaurants.map((rest, index) => (
          <div key={`marker__${rest.latitude}-${rest.longitude}-${index}`}>
            <MapMarker
              position={{
                lat: Number(rest.latitude),
                lng: Number(rest.longitude)
              }}
              clickable={true}
              onClick={() => setSelectedRestaurant(rest)}
            />
            {mapLevel < 10 && (
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
            )}
            {selectedRestaurant?.restaurant_name === rest.restaurant_name && (
              <RestaurantOverlay rest={rest} setSelectedRestaurant={setSelectedRestaurant} />
            )}
          </div>
        ))}
        {points.length > 0 && <ReSetttingMapBounds points={points} />}
      </Map>
    </>
  );
}
