import React from "react";
import { Helmet } from "react-helmet-async";
import PageCover from "../components/PageCover";
import SectionTitle from "../components/SectionTitle";

const AboutUs: React.FC = () => {
  const images = [
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474326FcD/beautiful-path-nature-wallpaper-hd_104835885.jpg",
    "https://www.ntnc.org.np/sites/default/files/styles/slider_1920x1024/public/default_images/default-cover_0.jpg?itok=14XRQdhm",
    "https://i0.wp.com/wheelchairtravel.org/wp-content/uploads/2020/01/faq-air-v2020-header-scaled.jpg?resize=1920%2C1024&ssl=1",
    "https://nadironthego.com/wp-content/uploads/2024/02/228A1941-1920x1024.jpg?crop=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4mQx4uxMTOHEOd7Gkn5dTZ5IXplmWxfzCzA&s",
    "https://i0.wp.com/unlockingthemagictravel.com/wp-content/uploads/2023/06/1528967599_0101ZZ_0880DR_1-scaled.jpg?resize=1920%2C1024&ssl=1",
    "https://nadironthego.com/wp-content/uploads/2024/03/Bangkok-Chinatown-1920x1024.webp?crop=1",
    "https://rachelirl.com/wp-content/uploads/2023/05/markus-spiske-H2R9j8VT_rU-unsplash-1920x1024.jpg",
    "https://traveltomorrow.com/wp-content/uploads/2021/07/Screen-Shot-2021-07-28-at-1.33.11-PM.png",
    "https://www.privateupgrades.com/blog/wp-content/uploads/2023/06/Moorea-1920x1024.jpg",
    "https://traveltomorrow.com/wp-content/uploads/2021/04/Screen-Shot-2021-04-29-at-8.48.10-AM.png",
  ];
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | About Us</title>
      </Helmet>

      <PageCover
        imageURL="https://api.editcors.com/uploads/soispt/1657459781118_ACPH8276-2.jpg"
        text="What we are"
        secondText="time to explore"
      />
      <SectionTitle
        heading="About Us"
        subheading="What we are time to explore us. You can find us in any travel or any location you want in the entire world"
      />
      <div className="carousel mb-20">
        {images.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img src={image} alt="image" className="w-[400px]" />
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutUs;
