import MainImage from "./components/mainPage/MainImage";
import ChefList from "./components/mainPage/ChefList";

async function Home() {
  return (
    <div className="mt-[83px]">
      <MainImage />
      <ChefList />
    </div>
  );
}

export default Home;
