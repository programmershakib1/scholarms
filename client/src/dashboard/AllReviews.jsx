import Swal from "sweetalert2";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactStars from "react-rating-stars-component";
import { formatDate } from "date-fns";
import Lottie from "lottie-react";
import no from "../assets/lottie/no.json";
import { Helmet } from "react-helmet-async";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reviews");
      return data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/review/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>All Reviews - ScholarMS</title>
      </Helmet>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-c shadow-xl rounded-xl p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-32 h-32">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={review?.user_image}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{review?.user_name}</h2>
                    <p className="text-p">
                      {formatDate(new Date(review?.review_date), "yyyy-MM-dd")}
                    </p>
                  </div>
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
              </div>
              <h4 className="font-bold mt-3">
                University :{" "}
                <span className="font-normal">{review?.university_name}</span>
              </h4>
              <h4>
                <span className="font-bold">Subject</span> :{" "}
                {review?.subject_category}
              </h4>
              <p className="mt-3">{review?.review}</p>
              <button
                onClick={() => handleDelete(review?._id)}
                className="bg-black text-white py-1.5 px-4 font-semibold rounded-md mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-center md:text-left">
            Reviews Not Found
          </h2>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
