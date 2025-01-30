import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../form/CheckoutForm";
import ApplyForm from "../form/ApplyForm";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarship/${id}`);
      return data;
    },
  });

  const { scholarship } = data;

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen">
      {paymentConfirm ? (
        <ApplyForm scholarship={scholarship}></ApplyForm>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            setPaymentConfirm={setPaymentConfirm}
            scholarship={scholarship}
          ></CheckoutForm>
        </Elements>
      )}
    </div>
  );
};

export default Payment;
