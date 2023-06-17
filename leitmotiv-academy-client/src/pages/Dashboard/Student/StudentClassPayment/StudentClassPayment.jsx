import SpaceY10 from "../../../../components/SpaceY10";
import Head3 from "../../../../components/Head3";
import { useParams } from "react-router-dom";
import useGetCourse from "../../../../hooks/useGetCourse";
import PaymentForm from "./sections/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATWAY_PK);

const StudentClassPayment = () => {
  const params = useParams();

  const { course } = useGetCourse(params.id);

  const { courseName, price } = course;

  const finalPrice = parseFloat(parseFloat(price).toFixed(2)) || 0;

  return (
    <SpaceY10>
      <Head3>Payment</Head3>

      <p>
        Payment for <span className="font-medium">{courseName}</span> course
      </p>

      <p>
        Price: <span className="font-medium">{finalPrice}</span>
      </p>

      <div className="mx-auto w-[420px]">
        <Elements stripe={stripePromise}>
          <PaymentForm price={finalPrice} course={course} />
        </Elements>
      </div>
    </SpaceY10>
  );
};

export default StudentClassPayment;
