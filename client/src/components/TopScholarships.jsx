import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import ScholarshipCard from "./ScholarshipCard";
import { Link } from "react-router-dom";
import border from "../assets/border.png";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const TopScholarships = () => {
  const { animationValue } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/top-scholarships");
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="mx-5 md:mx-0 mt-20">
      <div className="flex flex-col items-center">
        <motion.h2 {...animationValue} className="text-2xl font-bold mb-1">
          Top Scholarships
        </motion.h2>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {scholarships.map((scholarship, idx) => (
          <motion.div {...animationValue} key={idx}>
            <ScholarshipCard scholarship={scholarship}></ScholarshipCard>
          </motion.div>
        ))}
      </div>
      <Link to="allScholarships">
        <motion.button
          {...animationValue}
          className="bg-black text-white dark:text-p py-2 px-4 font-bold rounded-md mt-5"
        >
          All Scholarships
        </motion.button>
      </Link>
    </div>
  );
};

export default TopScholarships;
