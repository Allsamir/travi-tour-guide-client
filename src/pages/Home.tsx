import React from "react";
import Slider from "../components/Slider/Slider";
import SectionTitle from "../components/SectionTitle";
import TouristGuide from "../components/TouristGuide";
import { Helmet } from "react-helmet-async";
import TourType from "../components/TourType";
import Stories from "../components/Stories";

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Home</title>
      </Helmet>
      <Slider />
      <SectionTitle
        heading="Travel Guide"
        subheading="Search our website for the best destinations in the world, where you can enjoy the best vacations."
      />
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
