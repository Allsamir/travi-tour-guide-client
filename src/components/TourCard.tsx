import React from "react";
interface ChildProps {
  title: string;
  tourType: string;
  price: number;
  images: string[];
  description?: string;
  tourPlan?: {
    day1: string;
    day2: string;
    day3: string;
  };
  location?: string;
}
const TourCard: React.FC<ChildProps> = ({
  images,
  title,
  tourType,
  price,
  description,
}) => {
  return (
    <>
      <div
        className="relative bg-center bg-cover h-[80vh]"
        style={{ backgroundImage: `url('${images[0]}')` }}
      >
        <div className="price absolute top-6 left-6 bg-[#FFFCF7] py-2 px-4 rounded-3xl">
          <p className="text-base font-bold">${price}</p>
        </div>
        <div className="content absolute bottom-6 bg-[#FFFCF7] w-4/5 p-5 mx-5 space-y-2">
          <h2 className="font-serif font-bold text-xl">{title}</h2>
          <p className="font-serif font-semibold text-base">{tourType}</p>
          <p className="text-[13px]">{description}</p>
        </div>
      </div>
    </>
  );
};

export default TourCard;
