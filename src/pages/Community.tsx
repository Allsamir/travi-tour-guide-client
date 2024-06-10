import React from "react";
import { Helmet } from "react-helmet-async";
import PageCover from "../components/PageCover";
import SectionTitle from "../components/SectionTitle";

const Community: React.FC = () => {
  const images = [
    "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i5oVYZrMeDWI/v1/-1x-1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDcmdZXG7SVcMCUD9KUCGTnVhUsgQqQiO30Q&s",
    "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iepr4WBUGDFk/v1/-1x-1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg25-t2F4qgVm7fGEYTYPYCedMyTV_b8mQsQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzAP3v90_oBTbBMLU2BhJTkZ54CvLG8VAQ5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp-BVJsP9BfzsIvdL62GLUCR6Rv-CVS4hHxg&s",
    "https://wallpapercave.com/wp/wp4156958.jpg",
    "https://screenanarchy.com/assets/2023/10/gamma_rays_1.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTa7ThISoOK0DOPjHMRP5pYdxZiQqwA5lkOA&s",
  ];
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Community</title>
      </Helmet>
      <PageCover
        imageURL="https://greenvillejournal.com/wp-content/uploads/2019/08/National-Night-Out_004.jpg"
        text="We have a wonderful"
        secondText="Community"
      />
      <SectionTitle
        heading="Our Community"
        subheading="We have the best travel community in the world. You can find wonderful people here"
      />
      <img
        src="https://s4844.pcdn.co/wp-content/uploads/2018/08/cilmateprotest-e1533611716934.jpg"
        alt="Community image"
      />
      <SectionTitle heading="Our Community Members" />
      <div className="my-20">
        <div className="carousel carousel-center rounded-box gap-8">
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <img src={image} alt="Pizza" className="w-56 rounded-3xl" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
