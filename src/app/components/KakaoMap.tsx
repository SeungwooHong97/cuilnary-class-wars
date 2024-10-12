// "use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
	return (
		<>
			<Map
				id="map"
				center={{ lat: 33.450701, lng: 126.570667 }}
				style={{ width: "800px", height: "800px" }}
				level={3}
			>
				<MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
			</Map>
		</>
	);
}
