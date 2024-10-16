import KakaoMap from "@/app/components/map/KakaoMap";
import RestaurantDetail from "@/app/components/restaurantDetail/RestaurantDetail";
import RestaurantHeader from "@/app/components/restaurantDetail/RestaurantHeader";

import Reviews from "@/app/components/reviews/Reviews";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  params: { restaurantName: string };
};

export const generateMetadata = ({ params }: Props) => {
  return {
    title: `${params.restaurantName} 상세정보`,
    description: `${params.restaurantName}에 대한 상세정보, 위치 및 리뷰를 확인 할 수 있습니다`
  };
};

const restaurantDetail = async ({ params }: Props) => {
  const decodedRestaurantName = decodeURIComponent(params.restaurantName);
  const { data, error } = await supabase.from("restaurant").select().eq("restaurant_name", decodedRestaurantName);

  if (error) {
    console.error("Error", error.message);
    throw new Error("레스토랑 정보를 가져오는데 실패했습니다");
  }

  const restaurantDetail = data[0];

  return (
    <div className="mt-20 w-full h-full">
      <RestaurantHeader rest={restaurantDetail} />
      <div className="flex px-8 gap-5 mb-14">
        <RestaurantDetail rest={restaurantDetail} />
        <KakaoMap restaurants={data} selectedLocation={null} size={{ width: "600px", height: "400px" }} />
      </div>
      <Reviews rest={restaurantDetail} />
    </div>
  );
};

export default restaurantDetail;
