import React from "react";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const dummyData: Restaurant[] = [
  {
    id: 1,
    name: "맛집 1",
    description: "이곳은 정말 맛있습니다!",
    imageUrl: "/images/restaurant1.jpg"
  },
  {
    id: 2,
    name: "맛집 2",
    description: "특별한 요리를 제공합니다.",
    imageUrl: "/images/restaurant2.jpg"
  },
  {
    id: 3,
    name: "맛집 3",
    description: "편안한 분위기의 레스토랑입니다.",
    imageUrl: "/images/restaurant3.jpg"
  },
  {
    id: 4,
    name: "맛집 4",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  },
  {
    id: 5,
    name: "맛집 5",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  },
  {
    id: 6,
    name: "맛집 6",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  },
  {
    id: 7,
    name: "맛집 7",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  },
  {
    id: 8,
    name: "맛집 8",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  },
  {
    id: 9,
    name: "맛집 9",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  },
  {
    id: 10,
    name: "맛집 10",
    description: "가성비 좋은 맛집입니다.",
    imageUrl: "/images/restaurant4.jpg"
  }
];

export default async function Bookmark() {
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {dummyData.map((restaurant) => (
        <div key={restaurant.id} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
