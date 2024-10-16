export type User = {
  created_at: string;
  id: string;
  profile_img: string | null;
  updated_at: string | null;
  user_email: string | null;
  user_name: string | null;
  nickname: string | null;
};
export type Chef = {
  chef_class: string | null;
  chef_img_url: string;
  chef_name: string;
  created_at: string;
  description: string | null;
  id: string;
};
export type Restaurant = {
  id: string | null;
  restaurant_name: string;
  address: string | null;
  description: string | null;
  latitude: string | null;
  longitude: string | null;
  star: number | null;
  chef_name: string | null;
  restaurant_img_url: { images: string[] } | null;
};

export type Bookmark = {
  id: string;
  restaurant_id: string | null;
  user_id: string | null;
};

export type Review = {
  id: string;
  restaurant_id: string | null;
  review_content: string | null;
  star: string | null;
  user_id: string | null;
  created_at: string | null;
};

export type Chefs = Chef & {
  restaurant: Restaurant[];
};

export type CustomBookmark = {
  id: string;
  restaurant: CustomRestaurant;
};

export type CustomRestaurant = {
  chef_name: string | null;
  restaurant_name: string;
  description: string | null;
  star: number | null;
  restaurant_img_url: { images: string[] } | null;
};

