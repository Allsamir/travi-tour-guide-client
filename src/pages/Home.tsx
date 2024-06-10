import React from "react";
import Slider from "../components/Slider/Slider";
import SectionTitle from "../components/SectionTitle";
import TouristGuide from "../components/TouristGuide";
import { Helmet } from "react-helmet-async";
import TourType from "../components/TourType";
import Stories from "../components/Stories";
import { animated, useSpring } from "@react-spring/web";
const Home: React.FC = () => {
  const springs = useSpring({
    from: { x: 150 },
    to: { x: 0 },
  });
  const springs2 = useSpring({
    from: { x: -150 },
    to: { x: 0 },
  });
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Home</title>
      </Helmet>
      <animated.div
        style={{
          width: "100%",
          height: "100%",
          ...springs,
        }}
      >
        <Slider />
      </animated.div>
      <animated.div
        style={{
          width: "100%",
          height: "100%",
          ...springs2,
        }}
      >
        <SectionTitle
          heading="Travel Guide"
          subheading="Search our website for the best destinations in the world, where you can enjoy the best vacations."
        />
      </animated.div>
      <TouristGuide />
      <SectionTitle
        heading="Find Perfect Trip"
        subheading="Choose you desired tour type, we promise you the best service and best vacation experience"
      />
      <TourType />
      <SectionTitle
        heading="What Our Tourist Says!"
        subheading="Check out our tourists story with us, they got what they were promised trust, security, protection and more.."
      />
      <Stories />
    </>
  );
};

export default Home;
