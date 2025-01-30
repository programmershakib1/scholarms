import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SuccessCard from "./SuccessCard";
import border from "../assets/border.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";

const OurSuccessClient = () => {
  const { animationValue } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [application, setApplication] = useState([]);
  const { pathname } = useLocation();

  const { data: successApplications = [], isLoading } = useQuery({
    queryKey: ["success-applications"],
    queryFn: async () => {
      const { data } = await axiosPublic("/success-applications");
      return data;
    },
  });

  useEffect(() => {
    setApplication(
      pathname === "/successfulClient"
        ? successApplications
        : successApplications.slice(0, 6)
    );
  }, [pathname, successApplications]);

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="mx-5 md:mx-0 mt-20">
      <Helmet>
        <title>{pathname !== "/" && "Success Client - ScholarMS"}</title>
      </Helmet>
      <div
        className={`flex flex-col items-center ${
          pathname === "/successfulClient" ? "hidden" : ""
        }`}
      >
        <motion.h2 {...animationValue} className="text-2xl font-bold mb-1">
          Our successful clients
        </motion.h2>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {application.map((application, idx) => (
          <motion.div {...animationValue} key={idx}>
            <SuccessCard key={idx} application={application}></SuccessCard>
          </motion.div>
        ))}
      </div>
      <Link
        to="/successfulClient"
        className={pathname === "/successfulClient" ? "hidden" : ""}
      >
        <motion.button
          {...animationValue}
          className="bg-black text-white dark:text-p py-2 px-6 font-bold rounded-md mt-5"
        >
          See All
        </motion.button>
      </Link>
    </div>
  );
};

export default OurSuccessClient;
