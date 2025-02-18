import CountUp from "react-countup";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import border from "../assets/border.png";

const OurSuccess = () => {
  const { animationValue } = useAuth();
  return (
    <div className="mx-5 md:mx-0 mt-20">
      <div className="flex flex-col justify-center items-center">
        <motion.h2 {...animationValue} className="text-2xl font-bold mb-1">
          Our Success
        </motion.h2>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-row mt-5 md:mt-10">
        <motion.div
          {...animationValue}
          className="flex flex-col items-center shadow-xl rounded-xl py-8 dark:bg-c"
        >
          <i className="fa-solid fa-user text-7xl"></i>
          <CountUp
            start={0}
            end={130}
            duration={20}
            className="text-7xl font-bold py-5"
          />
          <h2 className="font-bold text-3xl">Users</h2>
        </motion.div>
        <motion.div
          {...animationValue}
          className="flex flex-col items-center shadow-xl rounded-xl py-8 dark:bg-c"
        >
          <i className="fa-solid fa-bars-progress text-7xl"></i>
          <CountUp
            start={0}
            end={120}
            duration={20}
            className="text-7xl font-bold py-5"
          />
          <h2 className="font-bold text-3xl">Scholarships</h2>
        </motion.div>
        <motion.div
          {...animationValue}
          className="flex flex-col items-center shadow-xl rounded-xl py-8 dark:bg-c"
        >
          <i className="fa-solid fa-user-graduate text-7xl"></i>
          <CountUp
            start={0}
            end={70}
            duration={20}
            className="text-7xl font-bold py-5"
          />
          <h2 className="font-bold text-3xl">Success</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default OurSuccess;
