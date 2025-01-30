import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "date-fns";
import ReactStars from "react-rating-stars-component";
import { MdAccessTime } from "react-icons/md";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ScholarshipDetails = () => {
  const { themeColor } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarship/${id}`);
      return data;
    },
  });

  const { scholarship, reviews } = data;

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  const {
    _id,
    university_name,
    country,
    city,
    application_fee,
    service_charge,
    subject_category,
    scholarship_category,
    image,
    posted_date,
    deadline,
    description,
    stipend,
  } = scholarship;

  return (
    <div className="mx-5 md:mx-0 dark:text-p">
      <Helmet>
        <title>Scholarship Details - ScholarMS</title>
      </Helmet>
      <div className="shadow-md p-5 rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="lg:w-1/2">
            <img
              className="w-full h-52 md:h-80 lg:h-96 rounded-xl"
              src={image}
              alt=""
            />
          </div>
          <div className="lg:w-1/2">
            <div>
              <img
                className="w-20"
                src={themeColor === "light" ? logo2 : logo}
                alt=""
              />
              <h4 className="text-2xl font-bold">
                University :{" "}
                <span className="text-xl font-bold">{university_name}</span>
              </h4>
            </div>
            <div className="grid md:grid-cols-3 md:gap-10 mt-3">
              <div className="col-span-1">
                <p className="font-semibold mt-3">
                  Subject :{" "}
                  <span className="font-normal">{subject_category}</span>
                </p>
                <p className="font-semibold mt-2">
                  City : <span className="font-normal">{country}</span>
                </p>
                <p className="font-semibold mt-2">
                  Country : <span className="font-normal">{city}</span>
                </p>
                <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                  <span>Posted Date : </span>
                  <span>
                    {" "}
                    {formatDate(new Date(posted_date), "yyyy-MM-dd")}
                  </span>
                </h4>
                <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                  <MdAccessTime className="text-xl" />
                  <span> {formatDate(new Date(deadline), "yyyy-MM-dd")}</span>
                </h4>
              </div>
              <div className="col-span-1">
                <p className="font-semibold mt-2">
                  Category :{" "}
                  <span className="font-normal">{scholarship_category}</span>
                </p>
                <p className="font-semibold mt-2">
                  Application Fee :{" "}
                  <span className="font-normal">{application_fee}</span>
                </p>
                <p className="font-semibold mt-2">
                  Service Charge :{" "}
                  <span className="font-normal">{service_charge}</span>
                </p>
                {stipend > 0 && (
                  <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                    <span>Stipend : </span>
                    <span> {scholarship?.stipend}</span>
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
        <Link to={`/payment/${_id}`}>
          <button className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-md">
            Apply Scholarship
          </button>
        </Link>
        <p className="mt-5">{description}</p>
      </div>

      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx} className="mt-10">
            <div className="text-center p-10">
              <div className="flex justify-center">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={review.user_image}
                  alt=""
                />
              </div>
              <h3 className="text-2xl font-bold mt-2">{review.user_name}</h3>
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
              <p className="lg:mx-60">{review.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScholarshipDetails;
