import React from "react";
import Slider from "../components/Slider/Slider";
import SectionTitle from "../components/SectionTitle";
import TouristGuide from "../components/TouristGuide";

const Home: React.FC = () => {
  return (
    <>
      <Slider />
      <SectionTitle
        heading="Travel Guide"
        subheading="Search our website for the best destinations in the world, where you can enjoy the best vacations."
      />
      <TouristGuide />
    </>
  );
};

export default Home;
