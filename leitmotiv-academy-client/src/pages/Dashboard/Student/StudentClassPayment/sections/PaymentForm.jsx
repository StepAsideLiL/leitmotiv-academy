import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toastError, toastSuccess } from "../../../../../utils/toastMessages";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../utils/axiosInstance";
import useFirebaseAuth from "../../../../../hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ price, course }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useFirebaseAuth();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("/create-payment-intent", { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      toastError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      toastError("Error occure!");
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      const payment = {
        email: user.email,
        transactionId: paymentIntent.id,
        transactionDate: paymentIntent.created,
        courseId: course._id,
        courseName: course.courseName,
        courseImage: course.courseImage,
        instructorName: course.instructorName,
        price,
      };

      axiosInstance
        .post("/v1/payment", payment)
        .then((res) => {
          if (res.data.acknowledged) {
            toastSuccess("Payment Successful!");
            navigate("/dashboard/student/my-enrolled-classes");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
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
      />

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn-info btn-sm btn my-3"
      >
        Pay
      </button>
    </form>
  );
};

PaymentForm.propTypes = {
  price: PropTypes.number.isRequired,
  course: PropTypes.object.isRequired,
};

export default PaymentForm;
