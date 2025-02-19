import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import library from "../assets/lottie/about.json";
import Lottie from "lottie-react";

const About = () => {
  const { animationValue } = useAuth();

  return (
    <div className="text-center mt-10 mx-5 md:mx-0">
      <div>
        <Lottie animationData={library} className="h-40"></Lottie>
      </div>
      <motion.h2
        {...animationValue}
        className="text-5xl font-bold min-h-52 md:min-h-28 lg:min-h-20"
      >
        Welcome to Scholarship Management System
      </motion.h2>
      <motion.p {...animationValue} className="text-p font-semibold lg:mx-20">
        Scholarship Management System (ScholarMS) is a user-friendly platform
        designed to simplify the process of finding, applying for, and managing
        scholarships. It connects students with opportunities and provides
        efficient tools for administrators to manage applications and awards.
        With ScholarMS, students can easily search for scholarships, track their
        application status, and receive real-time updates. The platform offers
        secure document submissions, detailed application histories, and a
        dedicated &quot;Special Scholarships&quot; section for exclusive
        opportunities. For administrators, ScholarMS provides powerful
        management tools, enabling them to review applications, manage user
        roles, and approve awards through an intuitive dashboard. Built with
        modern technologies like Firebase, MongoDB, and JWT, the platform
        ensures data security and smooth performance. ScholarMS is more than
        just a tool—it&apos;s a gateway to educational opportunities, empowering
        students and helping institutions support deserving talents efficiently
        and securely.
      </motion.p>
      <Link to="/allBooks">
        <motion.button
          {...animationValue}
          className="bg-black text-white dark:bg-c py-3 px-8 font-semibold mt-3 font-row rounded-sm"
        >
          EXPLORE NOW
        </motion.button>
      </Link>
    </div>
  );
};

export default About;
