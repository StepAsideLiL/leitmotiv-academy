import useDynamicTitle from "../../hooks/useDynamicTitle";
import BannerCarousel from "./sections/BannerCarousel";
import PopularClassesSection from "./sections/PopularClassesSection";
import PopularInstructorsSection from "./sections/PopularInstructorsSection";
import ViewAllCoursesSection from "./sections/ViewAllCoursesSection";

const Home = () => {
  useDynamicTitle("Leitmotiv Academy - Home");

  return (
    <div className="mb-20 space-y-20">
      <BannerCarousel />

      <div className="container mx-auto space-y-20 px-5 md:px-0">
        <PopularClassesSection />

        <PopularInstructorsSection />

        <ViewAllCoursesSection />
      </div>
    </div>
  );
};

export default Home;
