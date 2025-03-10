import "../output.css";
import NavBar from "../components/NavBar";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import HeroSection from "../components/HeroSection";
function HomePage() {
  return (
    <div className="w-full flex items-center justify-center ">
      <NavBar />
      <HeroSection />
    </div>
  );
}

export default HomePage;
