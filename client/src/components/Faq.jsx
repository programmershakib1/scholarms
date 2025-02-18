import q from "../assets/question.gif";
import border from "../assets/border.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./../hooks/useAuth";

const Faq = () => {
  const { animationValue } = useAuth();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("faq.json").then((res) => setQuestions(res.data));
  }, []);

  return (
    <div className="mt-20 mx-5 md:mx-0">
      <motion.div
        {...animationValue}
        className="flex flex-col md:flex-row items-center justify-center gap-3"
      >
        <h2 className="text-2xl font-black text-center font-row">
          FAQ,s On Scholarship Management System
        </h2>
        <img src={q} alt="" />
      </motion.div>
      <motion.div {...animationValue} className="flex justify-center">
        <img src={border} alt="" />
      </motion.div>
      <div className="mt-5 grid md:grid-cols-2 gap-5 shadow-xl rounded-xl">
        {questions.map((question, idx) => (
          <motion.div
            {...animationValue}
            key={idx}
            tabIndex="0"
            className="py-4 collapse collapse-arrow p-5 hover:shadow-xl dark:bg-c"
          >
            <div className="collapse-title text-xl font-medium">
              <h1>{question.question}</h1>
            </div>
            <div className="collapse-content">
              <p>{question.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
