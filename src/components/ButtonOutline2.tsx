import React from "react";

interface ChildProps {
  text: string;
  afunction?: () => void;
  buttonType?: "submit" | "button";
}
const ButtonOutline2: React.FC<ChildProps> = ({
  text,
  afunction,
  buttonType,
}) => {
  return (
    <button
      type={buttonType}
      className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
      onClick={afunction}
    >
      {text}
    </button>
  );
};

export default ButtonOutline2;
