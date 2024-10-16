"use client";
import { useEffect, useMemo } from "react";
import { useMap } from "react-kakao-maps-sdk";

export default function ReSetttingMapBounds({
  points
}: {
  points: {
    lat: number;
    lng: number;
  }[];
}) {
  const map = useMap(); // 현재 맵 객체에 접근하는 Hook
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    points.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [points]);

  useEffect(() => {
    if (points.length > 0) {
      map.setBounds(bounds);
    }
  }, [bounds, map, points]);

  return (
    <>
      <img
        src="/images/restaurant_default.png"
        alt="위치 재설정"
        className="w-[60px] h-[60px] object-cover rounded-full cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => map.setBounds(bounds)}
      />
    </>
  );
}
