

import Bookmark from "../components/mypage/Bookmark";
import Profile from "../components/mypage/Profile";


const myPage = () => {


  return (
    <div className="container mx-auto xl:max-w-[1280px] mt-32">
      <Profile></Profile>
      <Bookmark></Bookmark> 
    </div>
  );
};

export default myPage;
