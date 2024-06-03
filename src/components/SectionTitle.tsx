import React from "react";
interface ChildProps {
  heading: string;
  subheading?: string;
}
const SectionTitle: React.FC<ChildProps> = ({ heading, subheading }) => {
  return (
    <>
      <div className="text-center text-titleColor my-20 px-4">
        <div className="lg:w-1/2 md:h-4/5 w-full mx-auto">
          <h2 className="font-serif font-bold leading-[42px] md:text-4xl text-3xl">
            {heading}
          </h2>
          <p className="text-base text-textColor mt-4">{subheading}</p>
        </div>
      </div>
    </>
  );
};

export default SectionTitle;
