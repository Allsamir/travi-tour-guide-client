import React from "react";
interface ChildProps {
  text: string;
  afunction?: () => void;
  buttonType?: "submit" | "button";
}
const ButtonOutline: React.FC<ChildProps> = ({
  text,
  afunction,
  buttonType,
}) => {
  return (
    <button
      className="btn btn-outline text-primaryColor hover:text-secondaryColor hover:bg-primaryColor hover:border-none uppercase"
      onClick={afunction}
      type={buttonType}
    >
      {text}
    </button>
  );
};

export default ButtonOutline;
