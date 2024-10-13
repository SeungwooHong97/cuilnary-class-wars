// "use client";

import { Restaurant } from "@/types/info";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type Props = {
	restaurants: Restaurant[];
};

export default function KakaoMap({ restaurants }: Props) {
	console.log(restaurants);
	return (
		<>
			<Map
				id="map"
				center={{ lat: 33.450701, lng: 126.570667 }}
				style={{ width: "800px", height: "800px" }}
				level={3}
			>
				{restaurants.map((restaurant) => {
					return (
						<div key={restaurant.id}>
							<MapMarker
								position={{
									lat: Number(restaurant.latitude),
									lng: Number(restaurant.longitude),
								}}
							/>
						</div>
					);
				})}
			</Map>
		</>
	);
}
