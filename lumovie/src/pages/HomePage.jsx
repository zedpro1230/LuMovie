import "../output.css";
import NavBar from "../components/NavBar";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import HeroSection from "../components/HeroSection";
import TvShow from "../components/TvShow";
import Series from "../components/Series";
import Movie from "../components/Movie";
import Cartoon from "../components/Cartoon";

function HomePage() {
  return (
    <div className="w-[95%] ml-auto mr-auto flex items-center justify-center flex-col gap-5">
      <NavBar />
      <HeroSection />
      <TvShow />
      <Series />
      <Movie />
      <Cartoon />
    </div>
  );
}

export default HomePage;
