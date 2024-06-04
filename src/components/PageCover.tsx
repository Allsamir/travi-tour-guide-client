import React from "react";

interface ChildProps {
  imageURL: string;
  text: string;
  secondText?: string;
}

const PageCover: React.FC<ChildProps> = ({ imageURL, text, secondText }) => {
  return (
    <div
      className="w-full md:h-[80vh] h-[60vh] bg-cover bg-center relative"
      style={{
        backgroundImage: `url('${imageURL}')`,
      }}
    >
      <div className="w-full h-full bg-titleColor bg-opacity-45">
        <div className="content absolute bottom-8 left-4">
          <h2 className="text-primaryColor font-serif font-bold md:text-4xl text-2xl">
            {text} in
          </h2>
          <p className="text-primaryColor font-serif font-bold md:text-4xl text-2xl">
            {secondText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
