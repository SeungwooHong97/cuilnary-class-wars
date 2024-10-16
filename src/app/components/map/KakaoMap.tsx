"use client";

import { Restaurant } from "@/types/info";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ReSetttingMapBounds from "./ReSetttingMapBounds";
import ClcikOverlay from "./ClickOverlay";
import ZoomOverlay from "./ZoomOverlay";

type Props = {
  restaurants: Restaurant[];
  selectedLocation: { lat: number; lng: number } | null;
};

export default function KakaoMap({ restaurants, selectedLocation }: Props) {
  const [points, setPoints] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([]);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [mapLevel, setMapLevel] = useState(13);

  const mapRef = useRef<any>(null); // 지도 인스턴스 저장

  // 위도 경도 있는 식당들만 (null 처리)
  useEffect(() => {
    const newPoints = restaurants
      .filter((rest) => rest.latitude && rest.longitude)
      .map((rest) => ({
        lat: Number(rest.latitude),
        lng: Number(rest.longitude)
      }));
    setPoints(newPoints);
  }, [restaurants]);

  // 위치 이동 버튼 클릭 시 -> 이동 (선택한 식당 위치)
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      const newCenter = new kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
      mapRef.current.setLevel(3);
      mapRef.current.setCenter(newCenter);
    }
  }, [selectedLocation]);

  const handleZommChanged = (map: kakao.maps.Map) => {
    setMapLevel(map.getLevel());
  };

  return (
    <div className="relative mt-[30px] mr-[20px]">
      <Map
        id="map"
        center={{ lat: 36.463648328911795, lng: 128.17089555281063 }}
        style={{ width: "1100px", height: "800px" }}
        level={13}
        onZoomChanged={handleZommChanged}
        ref={mapRef}
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
            {mapLevel < 10 && <ZoomOverlay rest={rest} />}
            {selectedRestaurant?.restaurant_name === rest.restaurant_name && (
              <ClcikOverlay rest={rest} setSelectedRestaurant={setSelectedRestaurant} />
            )}
          </div>
        ))}
        {points.length > 0 && (
          <div className="absolute bottom-5 right-5 z-10">
            <ReSetttingMapBounds points={points} />
          </div>
        )}
      </Map>
    </div>
  );
}
