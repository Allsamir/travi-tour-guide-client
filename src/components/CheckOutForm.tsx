import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useSecureAxios from "../hooks/useSecureAxios";
interface ChildProps {
  id?: string;
}
const CheckOutForm: React.FC<ChildProps> = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const secureAxios = useSecureAxios();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/payment-completion`,
      },
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message || "");
    } else if (paymentIntent.status === "succeeded") {
      setMessage(
        "Payment status: " +
          paymentIntent.status +
          "🎉. Your transaction id: " +
          paymentIntent.id,
      );
    } else {
      setMessage("An unexpected error occurred.");
    }

    if (!error) {
      secureAxios
        .patch(`/bookings/paid?id=${id}`)
        .then((res) => res.data.success && console.log("Paid"));
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto container px-4 py-20">
      <div className="lg:w-1/2 md:w-4/5 w-full mx-auto mt-12">
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="btn mt-4 btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
          >
            <span id="button-text">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && (
            <div id="payment-message">
              <p className="mt-4">{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
