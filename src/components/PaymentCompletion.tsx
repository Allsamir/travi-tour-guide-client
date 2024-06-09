import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ButtonOutline2 from "./ButtonOutline2";

const PaymentCompletion: React.FC = () => {
  return (
    <>
      <Helmet>Travi - Dashboard | Payment Completion</Helmet>
      <div className="flex flex-col justify-center items-center h-screen space-y-8">
        <h1>Thank you for successfull Payment🎉🎉</h1>
        <Link to={`/dashboard/my-bookings`}>
          <ButtonOutline2 text="My Bookings" />
        </Link>
      </div>
    </>
  );
};

export default PaymentCompletion;
