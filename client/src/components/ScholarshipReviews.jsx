import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { formatDate } from "date-fns";
import ReactStars from "react-rating-stars-component";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import border from "../assets/border.png";

const ScholarshipReviews = () => {
  const { animationValue } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/reviews");
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
      <div className="flex flex-col justify-center items-center">
        <motion.h2 {...animationValue} className="text-2xl font-bold mb-1">
          User Reviews
        </motion.h2>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-center py-10">
              <div className="flex justify-center">
                <img
                  className="w-32 h-32 rounded-full object-cover"
                  src={review.user_image}
                  alt=""
                />
              </div>
              <h3 className="text-2xl font-bold mt-2">{review.user_name}</h3>
              <h4 className="mt-2 font-bold">{review.scholarship_name}</h4>
              <h4 className="mt-2 font-bold">{review.university_name}</h4>
              <div className="flex justify-center items-center gap-3">
                <p className="text-lg">
                  {formatDate(new Date(review?.review_date), "yyyy-MM-dd")}
                </p>
                <p>
                  <ReactStars
                    count={5}
                    value={parseInt(review?.rating)}
                    size={30}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  ></ReactStars>
                </p>
              </div>
              <p>{review.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScholarshipReviews;
