"use client";
import ChefDetail from "@/app/components/chefDetailPage/ChefDetail";
import RestaurantList from "@/app/components/chefDetailPage/RestaurantList";
import KakaoMap from "@/app/components/map/KakaoMap";
import { supabase } from "@/lib/supabaseClient";
import { Chefs, Restaurant } from "@/types/info";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  params: { chefName: string };
};

const ChefDetailPage = ({ params }: Props) => {
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
      <div className="flex sm:flex-col md:flex-row justify-center items-center min-h-[calc(100vh-72px)] bg-gray-50">
        <div className="flex-none items-center w-full md:w-[550px] mr-[20px]">
          <div className="w-full md:w-[550px] h-[400px] md:h-[800px] rounded-r-lg bg-zinc-200 mt-[30px]" />
        </div>
        <div className="flex-grow">
          <div className="mr-[20px] w-full h-[400px] md:h-[800px] bg-zinc-200 mt-[30px]" />
        </div>
      </div>
    );
  }

  if (chefData)
    return (
      <div className="flex sm:flex-col md:flex-row justify-center items-center min-h-[calc(100vh-72px)] bg-gray-50">
        <div className="flex-none items-center w-full md:w-[550px] mr-[20px]">
          <ChefDetail chefData={chefData} restaurants={restaurants} handleMoveToLocation={handleMoveToLocation} />
        </div>
        <div className="flex-grow">
          <KakaoMap
            restaurants={restaurants}
            selectedLocation={selectedLocation}
            size={{ width: "100%", height: "800px" }}
          />
        </div>
      </div>
    );
};

export default ChefDetailPage;
