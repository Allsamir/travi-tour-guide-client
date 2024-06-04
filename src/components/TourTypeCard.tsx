import { Rate } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface ChilProps {
  img: string;
  typeOfTour: string;
  text: string;
  rateValue: number;
  des: string;
}

const TourTypeCard: React.FC<ChilProps> = ({
  img,
  typeOfTour,
  text,
  rateValue,
  des,
}) => {
  return (
    <>
      <div className="">
        <Link to={`/tour-type/${typeOfTour}`}>
          <figure className="relative inline-block overflow-hidden w-full text-base shadow-xl my-4 ">
            <img src={img} alt="Image" className="w-full align-top" />
            <figcaption
              className="absolute h-[90px] hover:h-[75%] right-4 left-4 bottom-4 text-primaryColor overflow-hidden p-4 space-y-3"
              style={{
                backgroundColor: "rgb(36, 133, 176, 0.8)",
                transition: ".5s",
              }}
            >
              <h4 className="font-serif font-bold">{text}</h4>
              <Rate defaultValue={rateValue} disabled />
              <p>{des}</p>
            </figcaption>
          </figure>
        </Link>
      </div>
    </>
  );
};

export default TourTypeCard;
