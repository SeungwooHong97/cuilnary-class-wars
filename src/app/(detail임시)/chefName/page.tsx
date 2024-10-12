import KakaoMap from "@/app/components/KakaoMap";
import Link from "next/link";

//<Link href={`/chefDetail/${chef.name}`}>
//셰프 props로 받아오기
//metadata 활용

type Props = {
	params: { chefName: string };
};

const chefDetail = async ({ params }: Props) => {
	return (
		<div className="flex justify-around items-center min-h-[calc(100vh-56px)]">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-lg font-bold">셰프</h1>
				<div>
					<Link
						href={`/chefDetail/{셰프이름}/restaurantDetail/{가게이름}`}
						className="flex"
					>
						<img />
						<div className="flex flex-col">
							<h2 className="text-lg font-bold">가게 이름</h2>
							<div className="flex gap-[10px] items-center">
								<p className="text-lg font-bold">⭐별점</p>
								<p className="text-sm font-light">
									(리뷰 개수)
								</p>
								<p className="text-sm font-light">위치</p>
								<p className="text-sm font-light">
									전문 분야(specialty)
								</p>
							</div>
						</div>
						<img />
					</Link>
				</div>
			</div>
			<KakaoMap />
		</div>
	);
};

export default chefDetail;
