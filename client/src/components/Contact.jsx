import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const Contact = () => {
  const { animationValue } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleQuestions = (data) => {
    const { name, location, phone, email, question } = data;
    const questionInfo = {
      name,
      location,
      phone,
      email,
      question,
    };
    axiosPublic.post("/question", questionInfo).then((res) => {
      if (res.data.insertedId) {
        reset();
        toast.success("Question submit Successful");
      }
    });
  };

  return (
    <div className="mx-5 md:mx-0 dark:text-p">
      <motion.div {...animationValue} className="mt-20 text-center">
        <h2 className="font-bold text-lg">
          Have questions about your ScholarMS?
        </h2>
        <p className="text-p font-semibold mb-10">
          Send us your question and we will try to answer you quickly.
        </p>
      </motion.div>
      <form onSubmit={handleSubmit(handleQuestions)}>
        <motion.div
          {...animationValue}
          className="flex flex-col md:flex-row justify-center gap-2 md:gap-5"
        >
          <div className="w-full">
            <span className="font-semibold text-left">Name</span>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name"
              className="w-full shadow-md rounded-full py-3 mt-1 mb-2 pl-3 dark:bg-c"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <span className="font-semibold">Location</span>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Location"
              className="w-full shadow-md rounded-full py-3 mt-1 mb-2 pl-3 dark:bg-c"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>
        </motion.div>
        <motion.div
          {...animationValue}
          className="flex flex-col md:flex-row justify-center gap-2 md:gap-5"
        >
          <div className="w-full">
            <span className="font-semibold">Phone</span>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="number"
              placeholder="Phone"
              className="w-full shadow-md rounded-full py-3 mt-1 mb-2 pl-3 dark:bg-c"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="w-full">
            <span className="font-semibold">Email</span>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Email"
              className="w-full shadow-md rounded-full py-3 mt-1 mb-2 pl-3 dark:bg-c"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </motion.div>
        <motion.div {...animationValue}>
          <span className="font-semibold">Question</span>
          <textarea
            {...register("question", { required: "Question is required" })}
            className="w-full shadow-md rounded-xl h-40 pl-3 pt-3 dark:bg-c mt-1 mb-2"
            placeholder="Question"
          />
          {errors.question && (
            <p className="text-red-500">{errors.question.message}</p>
          )}
        </motion.div>
        <motion.button
          {...animationValue}
          className="bg-black dark:bg-c text-white dark:text-p py-2 px-10 rounded-sm font-bold mt-3"
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
};

export default Contact;
