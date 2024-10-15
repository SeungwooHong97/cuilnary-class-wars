import RestaurantCard from "@/app/components/chefDetailPage/RestaurantCard";
import KakaoMap from "@/app/components/map/KakaoMap";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

//metadata 활용

type Props = {
  params: { chefName: string };
};

export function generateMetadata({ params }: Props) {
  return {
    title: `흑백요리사 : ${decodeURIComponent(params.chefName)}`,
    description: `${params.chefName} 상세 페이지`
  };
}

const chefDetail = async ({ params }: Props) => {
  console.log("params", decodeURIComponent(params.chefName));
  const decodedChefName = decodeURIComponent(params.chefName);
  const { data, error } = await supabase.from("chef").select("*, restaurant(*)").eq("chef_name", decodedChefName);

  if (error) {
    console.error("Error:", error.message);
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }

  console.log(data[0]);
  const chefData = data[0];
  const restaurants = chefData.restaurant;

  return (
    <div className="flex justify-around items-center min-h-[calc(100vh-56px)]">
      <div className="flex flex-col justify-center items-center gap-[30px] w-[800px] ">
        <Image
          src={
            chefData.chef_img_url ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
          }
          alt={chefData.chef_name}
          width={413}
          height={261}
        />

        <div className="w-[600px] max-h-[500px] overflow-y-auto p-[20px]">
          {chefData.chef_img_url ? null : <h1 className="text-lg font-bold my-[30px]">{chefData.chef_name}</h1>}

          <input />
          <div className="flex flex-col gap-[30px]">
            {restaurants.map((rest) => {
              return <RestaurantCard rest={rest} data={data[0]} />;
            })}
          </div>
        </div>
      </div>
      <KakaoMap restaurants={restaurants} />
    </div>
  );
};

export default chefDetail;
