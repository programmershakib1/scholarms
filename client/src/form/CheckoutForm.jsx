import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const CheckoutForm = ({ setPaymentConfirm, scholarship }) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const totalAmount = scholarship.application_fee;

  useEffect(() => {
    if (totalAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      toast.error("Please provide valid card details");
      return;
    }

    setLoading(true);

    try {
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "anonymous",
            },
          },
        });
      if (confirmError) {
        toast.error(confirmError.message);
        setLoading(false);
        return;
      } else {
        if (paymentIntent.status === "succeeded") {
          toast.success("payment successful");
          setPaymentConfirm(true);
        }
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto mt-20"
      action=""
    >
      <Helmet>
        <title>Payment - ScholarMS</title>
      </Helmet>
      <CardElement
        className="border-2 border-black p-4 rounded-md"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="bg-black text-white py-2 px-6 mt-5 font-semibold rounded-md"
        type="submit"
        disabled={!stripe || !clientSecret || loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-white"></span>
          </div>
        ) : (
          "Pay"
        )}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  setPaymentConfirm: PropTypes.func,
  scholarship: PropTypes.object,
};

export default CheckoutForm;
