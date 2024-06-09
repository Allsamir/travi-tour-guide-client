import React from "react";
import TourTypeCard from "./TourTypeCard";

const TourType: React.FC = () => {
  const tourTypes = [
    {
      type: "Hiking",
      img: "https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destination-single-1-477x322.jpg",
      rateValue: 4,
      des: "Experience the thrill of hiking through breathtaking mountain trails, perfect for nature enthusiasts and adventure seekers.",
    },
    {
      type: "Wildlife",
      img: "https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destination-single-3-477x322.jpg",
      rateValue: 5,
      des: "Embark on an unforgettable wildlife safari and witness exotic animals in their natural habitat.",
    },
    {
      type: "Air Rides",
      img: "https://roam.qodeinteractive.com/wp-content/uploads/2017/08/tour-gallery-img-13-477x322.jpg",
      rateValue: 3,
      des: "Soar through the skies with our exhilarating air ride tours, including hot air balloon and helicopter rides.",
    },
    {
      type: "Sports",
      img: "https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destitnation-title-img-4.jpg",
      rateValue: 5,
      des: "Join us for an action-packed sports adventure, featuring a variety of exciting activities and competitions.",
    },
    {
      type: "Riding",
      img: "https://roam.qodeinteractive.com/wp-content/uploads/2017/08/tour-title-img-1.jpg",
      rateValue: 3,
      des: "Explore scenic trails on horseback with our guided riding tours, perfect for riders of all skill levels.",
    },
    {
      type: "Swimming",
      img: "https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destitnation-title-img-8.jpg",
      rateValue: 4,
      des: "Dive into crystal clear waters with our tropical swimming tours, perfect for relaxing and enjoying the sun.",
    },
  ];
  return (
    <>
      <div className="my-20 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
        {tourTypes.map((type, index) => (
          <TourTypeCard
            img={type.img}
            typeOfTour={type.type}
            key={index}
            text={type.type}
            rateValue={type.rateValue}
            des={type.des}
          />
        ))}
      </div>
    </>
  );
};

export default TourType;
