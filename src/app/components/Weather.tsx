"use Client";
import Image from "next/image";
import { useEffect, useState } from "react";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Weather() {
  const [weather, setWeather] = useState<{
    temp: number;
    icon: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        console.log(data);

        const temp = Math.round(data.main.temp);
        const weatherIcon = data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        setWeather({
          temp: temp,
          icon: weatherIconAdrs
        });
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (weather)
    return (
      <div className="flex items-center">
        <div className="relative h-[72px] w-[72px] rounded-lg overflow-hidden">
          <Image src={weather.icon} alt={"chefName"} layout="fill" style={{ objectFit: "cover" }} />
        </div>
        <p className="md:mr-4 text-zinc-400">{weather.temp}°C</p>
      </div>
    );
}
