import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";

import slide1 from "../../../assets/images/banner/slide-1.jpg";
import slide2 from "../../../assets/images/banner/slide-2.jpg";
import slide3 from "../../../assets/images/banner/slide-3.jpg";
import slide4 from "../../../assets/images/banner/slide-4.jpg";
import { Link } from "react-router-dom";

const BannerCarousel = () => {
  return (
    <Carousel showThumbs={false} autoPlay={true}>
      {/* Slide 1 */}
      <CarouselHeroWithOverlyImage image={slide1}>
        <p className="text-base font-semibold md:text-xl">
          Igniting Your Cinematic Passion!
        </p>
        <h1 className="text-2xl md:text-6xl">
          Welcome to{" "}
          <span className="font-bold text-accent">LEITMOTIV ACADEMY</span>
        </h1>
        <p className="text-lg font-semibold md:text-2xl">
          Unleash Your Creativity on the Silver Screen!
        </p>
        <Link to="/classes" className="btn-success btn">
          See Courses
        </Link>
      </CarouselHeroWithOverlyImage>

      {/* Slide 2 */}
      <CarouselHeroWithOverlyImage image={slide2}>
        <p className="text-base font-semibold md:text-xl">
          Discover the Magic of Cinematic Expression!
        </p>
        <h1 className="text-2xl md:text-6xl">
          Step into the World of Filmmaking at{" "}
          <span className="font-bold text-accent">LEITMOTIV ACADEMY</span>
        </h1>
        <p className="text-lg font-semibold md:text-2xl">
          Immerse yourself in the art of storytelling, directing,
          cinematography, editing, and sound design at LEITMOTIV ACADEMY.
        </p>
      </CarouselHeroWithOverlyImage>

      {/* Slide 3 */}
      <CarouselHeroWithOverlyImage image={slide3}>
        <p className="text-base font-semibold md:text-xl">
          Unlock Your Potential, Transform Your Vision!
        </p>
        <h1 className="text-2xl md:text-6xl">
          Empower Your Filmmaking Journey at{" "}
          <span className="font-bold text-accent">LEITMOTIV ACADEMY</span>
        </h1>
        <p className="text-lg font-semibold md:text-2xl">
          Embrace the guidance of industry experts and experienced instructors
          at LEITMOTIV ACADEMY.
        </p>
      </CarouselHeroWithOverlyImage>

      {/* Slide 4 */}
      <CarouselHeroWithOverlyImage image={slide4}>
        <p className="text-base font-semibold md:text-xl">
          Lights, Camera, Action - Your Summer of Filmmaking Begins Here!
        </p>
        <h1 className="text-2xl md:text-6xl">
          Join Our Summer Film Program at{" "}
          <span className="font-bold text-accent">LEITMOTIV ACADEMY</span>
        </h1>
        <p className="text-lg font-semibold md:text-2xl">
          Enroll in our highly anticipated summer film program and dive into a
          world of creativity and collaboration.
        </p>
      </CarouselHeroWithOverlyImage>
    </Carousel>
  );
};

const CarouselHeroWithOverlyImage = ({ image, children }) => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

CarouselHeroWithOverlyImage.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BannerCarousel;
