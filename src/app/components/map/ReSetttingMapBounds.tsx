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
      <button onClick={() => map.setBounds(bounds)}>재설정</button>
    </>
  );
}
