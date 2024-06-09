import React from "react";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckOutForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment: React.FC = () => {
  const { id } = useParams();
  const secureAxios = useSecureAxios();
  const { data: price } = useQuery({
    queryKey: ["usersPayment", id],
    queryFn: async () =>
      (await secureAxios.get(`/bookings/singleBooking?id=${id}`)).data,
  });
  const { isError, isLoading, data } = useQuery({
    queryKey: ["paymentIntent"],
    queryFn: async () =>
      (
        await secureAxios.post(`/users/createPaymentIntent`, {
          price: price.price * 100,
        })
      ).data,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Error loading Payment details
      </div>
    );
  }
  const options = {
    clientSecret: data.clientSecret,
  };
  return (
    <>
      <Helmet>
        <title>Travi - Dashboard | Payment</title>
      </Helmet>
      <div className="App">
        {data && (
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForm id={id} />
          </Elements>
        )}
      </div>
    </>
  );
};

export default Payment;
