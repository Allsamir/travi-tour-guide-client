import React from "react";

interface ChildProps {
  text: string;
  afunction?: () => void;
  buttonType?: "submit" | "button";
  extraClass?: string;
}
const ButtonOutline2: React.FC<ChildProps> = ({
  text,
  afunction,
  buttonType,
  extraClass,
}) => {
  return (
    <button
      type={buttonType}
      className={`btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor ${extraClass}`}
      onClick={afunction}
    >
      {text}
    </button>
  );
};

export default ButtonOutline2;
