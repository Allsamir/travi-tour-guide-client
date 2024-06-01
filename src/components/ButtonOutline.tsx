import React from "react";
interface ChildProps {
  text: string;
}
const ButtonOutline: React.FC<ChildProps> = ({ text }) => {
  return (
    <button className="btn btn-outline text-primaryColor hover:text-secondaryColor hover:bg-primaryColor hover:border-none uppercase">
      {text}
    </button>
  );
};

export default ButtonOutline;
