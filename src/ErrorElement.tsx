import React from "react";
import { Helmet } from "react-helmet-async";
import ButtonOutline2 from "./components/ButtonOutline2";
import { Link } from "react-router-dom";

const ErrorElement: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Travi - Tour Guide | Error Page</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen flex-col space-y-8">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHpsemppZDcyZ3MxMGlhazl1czl6YmpkNjA2dTBic2FhdXk1dWdrZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iPnLFwV5pPBsc/giphy.webp"
          alt="Error GIF"
        />
        <Link to={`/`}>
          <ButtonOutline2 text="Home"></ButtonOutline2>
        </Link>
      </div>
    </>
  );
};

export default ErrorElement;
