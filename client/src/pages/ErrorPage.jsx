import { Link, useNavigate } from "react-router-dom";
import oops from "../assets/lottie/oops.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>Not Found - ScholarMS</title>
      </Helmet>
      <div>
        <Lottie animationData={oops} className="w-full md:h-[800px]"></Lottie>
      </div>
      <div className="flex justify-center gap-5">
        <Link to="/">
          <button className="bg-black text-white font-semibold py-2 px-6 rounded-md">
            Go Home
          </button>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white font-semibold py-2 px-6 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
