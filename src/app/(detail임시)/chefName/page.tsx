// import KakaoMap from "@/app/components/KakaoMap";
// import { supabase } from "@/lib/supabaseClient";
// import { Restaurant } from "@/types/info";
// import Image from "next/image";
// import Link from "next/link";

// //metadata 활용

// // type Props = {
// // 	params: { chefName: string };
// // };
// // { params }: Props

// const chefDetail = async () => {
// 	const { data, error } = await supabase
// 		.from("chef")
// 		.select("*, restaurant(*)")
// 		.eq("chef_name", "최현석");

// 	if (error) {
// 		console.error("Error:", error.message);
// 		throw new Error("데이터를 가져오는 데 실패했습니다.");
// 	}
// 	console.log("\n\n");
// 	console.log(data);
// 	console.log("\n\n");

// 	const chefData = data[0];
// 	const restaurants: Restaurant[] = chefData.restaurant;

// 	return (
// 		<div className="flex justify-around items-center min-h-[calc(100vh-56px)]">
// 			<div className="flex flex-col justify-center items-center gap-[30px]">
// 				<Image
// 					src={
// 						chefData.chef_img_url ??
// 						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
// 					}
// 					alt={chefData.chef_name}
// 					width={550}
// 					height={120}
// 				/>
// 				{chefData.chef_img_url ? null : (
// 					<h1 className="text-lg font-bold my-[30px]">
// 						{chefData.chef_name}
// 					</h1>
// 				)}

// 				<div className="flex flex-col gap-[30px]">
// 					{restaurants.map((rest) => {
// 						return (
// 							<div key={rest.id}>
// 								<Link
// 									href={`/chefName/${rest.restaurant_name}`}
// 									className="flex items-center gap-[15px]"
// 								>
// 									<Image
// 										src={
// 											rest.restaurant_img_url ??
// 											"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
// 										}
// 										alt={data[0].chef_name}
// 										width={60}
// 										height={60}
// 									/>
// 									<div className="flex flex-col">
// 										<h2 className="font-bold">
// 											{rest.restaurant_name}
// 										</h2>
// 										<div className="flex gap-[10px] items-center">
// 											<p className="font-bold">
// 												⭐{rest.star}
// 											</p>
// 											<p className="text-sm font-light">
// 												{rest.description ??
// 													"정보 없음"}
// 											</p>
// 											●
// 											<p className="text-sm font-light">
// 												{rest.address
// 													?.split(" ")
// 													.slice(0, 2)
// 													.join(" ")}
// 											</p>
// 										</div>
// 									</div>
// 								</Link>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 			<KakaoMap restaurants={restaurants} />
// 		</div>
// 	);
// };

// export default chefDetail;
