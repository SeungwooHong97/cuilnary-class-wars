
import Bookmark from "./_components/Bookmark";
import Profile from "./_components/Profile";

const myPage = () => {
  return (
    <div className="container mx-auto xl:max-w-[1280px]">
      <Profile></Profile>
      <Bookmark></Bookmark> 
    </div>
  );
};

export default myPage;
