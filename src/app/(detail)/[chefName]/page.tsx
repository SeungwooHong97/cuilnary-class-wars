"use client";
import ChefDetail from "@/app/components/chefDetailPage/ChefDetail";
import KakaoMap from "@/app/components/map/KakaoMap";
import { supabase } from "@/lib/supabaseClient";
import { Chefs, Restaurant } from "@/types/info";
import { useEffect, useState } from "react";

type Props = {
  params: { chefName: string };
};

const chefDetail = ({ params }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [chefData, setChefData] = useState<Chefs | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMoveToLocation = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  useEffect(() => {
    const decodedChefName = decodeURIComponent(params.chefName);

    const fetchData = async () => {
      const { data, error } = await supabase.from("chef").select("*, restaurant(*)").eq("chef_name", decodedChefName);

      if (error) {
        console.error("Error:", error.message);
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }

      setChefData(data[0]);
      setRestaurants(data[0].restaurant);
      setLoading(false);
    };

    fetchData();
  }, [params.chefName]);

  if (loading) {
    return (
      <div className="flex justify-between items-center min-h-[calc(100vh-56px)] bg-gray-50">
        <div className="w-[550px] h-[800px] rounded-r-lg bg-zinc-200" />
        <div className="mr-[20px] w-[1100px] h-[800px] bg-zinc-200" />
      </div>
    );
  }

  if (chefData && restaurants)
    return (
      <div className="flex justify-between items-center min-h-[calc(100vh-56px)] bg-gray-50">
        <ChefDetail chefData={chefData} restaurants={restaurants} handleMoveToLocation={handleMoveToLocation} />
        <div className="mr-[20px]">
          <KakaoMap restaurants={restaurants} selectedLocation={selectedLocation} />
        </div>
      </div>
    );
};

export default chefDetail;
