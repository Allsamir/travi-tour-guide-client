import React from "react";
import { Link } from "react-router-dom";
import Package from "../interfaces/Package";
interface ChildProps {
  tourData: Package;
}
const TourCard: React.FC<ChildProps> = ({ tourData }) => {
  return (
    <>
      <Link to={`/tour-details/${tourData._id}`}>
        <div
          className="relative bg-center bg-cover h-[80vh] hover:scale-110 transition"
          style={{ backgroundImage: `url('${tourData.images[0]}')` }}
        >
          <div className="price absolute top-6 left-6 bg-[#FFFCF7] py-2 px-4 rounded-3xl">
            <p className="text-base font-bold">${tourData.price}</p>
          </div>
          <div className="content absolute bottom-6 bg-[#FFFCF7] w-4/5 p-5 mx-5 space-y-2">
            <h2 className="font-serif font-bold text-xl">{tourData.title}</h2>
            <p className="font-serif font-semibold text-base">
              {tourData.tourType}
            </p>
            <p className="text-[13px]">
              {tourData.description?.slice(0, 147)}.
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TourCard;
