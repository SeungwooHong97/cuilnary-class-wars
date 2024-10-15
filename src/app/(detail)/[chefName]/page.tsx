"use client";
import RestaurantList from "@/app/components/chefDetailPage/RestaurantList";
import KakaoMap from "@/app/components/map/KakaoMap";
import { supabase } from "@/lib/supabaseClient";
import { Chefs, Restaurant } from "@/types/info";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  params: { chefName: string };
};

const chefDetail = ({ params }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [chefData, setChefData] = useState<Chefs | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

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
    };

    fetchData();
  }, [params.chefName]);

  if (chefData && restaurants)
    return (
      <div className="flex justify-between items-center min-h-[calc(100vh-56px)] bg-gray-50">
        <div className="flex flex-col justify-center items-center w-full w-[550px] h-[800px] shadow-lg rounded-r-lg p-6 gap-6 bg-[#ffffff]">
          <Image src={chefData.chef_img_url} alt={chefData.chef_name} width={480} height={261} objectFit="cover" />
          {chefData.chef_img_url ? null : <h1 className="text-lg font-bold my-[30px]">{chefData.chef_name}</h1>}
          <RestaurantList restaurants={restaurants} data={chefData} handleMoveToLocation={handleMoveToLocation} />
        </div>
        <div className="mr-[20px]">
          <KakaoMap restaurants={restaurants} selectedLocation={selectedLocation} />
        </div>
      </div>
    );
};

export default chefDetail;
