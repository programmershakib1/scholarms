import { Link } from "react-router-dom";
import border from "../assets/border.png";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
const SpecialScholarship = () => {
  const { animationValue } = useAuth();

  return (
    <div className="mx-5 md:mx-0 mt-20 dark:text-p">
      <div className="flex flex-col items-center">
        <motion.h2 {...animationValue} className="text-2xl font-bold mb-1">
          Special Scholarship
        </motion.h2>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 mt-5">
        <motion.div
          {...animationValue}
          className="w-full h-56 md:h-96 lg:w-1/2"
        >
          <img
            className="w-full h-full rounded-xl"
            src="https://i.ibb.co.com/26sFG8X/64d39070-8596-11ef-addc-5556603eb4c1.jpg"
            alt=""
          />
        </motion.div>
        <div className="lg:w-1/2 flex flex-col justify-center items-center text-center">
          <motion.h3 {...animationValue} className="text-2xl font-bold">
            &quot;Dream Big Scholarship 2025&quot;
          </motion.h3>
          <motion.h2 {...animationValue} className="text-5xl font-black mt-3">
            Exclusive Special Scholarship!
          </motion.h2>
          <motion.p {...animationValue} className="mt-3 md:mx-20">
            Take advantage of a unique opportunity to advance your academic
            journey! This scholarship is exclusively available to registered
            users of our platform. No fees are required—just sign up and apply
            for free. Secure your chance to shine today!
          </motion.p>
          <Link to="/specialDetails">
            <motion.button
              {...animationValue}
              className="bg-black text-white dark:text-p py-2 px-4 font-semibold rounded-md mt-3"
            >
              Learn more
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialScholarship;
