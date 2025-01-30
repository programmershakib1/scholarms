import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import no from "../assets/lottie/no.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviewData, setReviewData] = useState("");
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${user?.email}`);
      return data;
    },
  });

  useEffect(() => {
    if (reviewData?.rating) {
      setRating(reviewData.rating);
    }
  }, [reviewData]);

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
              title: "Canceled!",
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleStarClick = (value) => {
    setRating(value);
    setErrorMessage("");
  };

  const onSubmit = async (data) => {
    if (rating === 0) {
      setErrorMessage("Rating is required");
      return;
    }
    document.getElementById("my_modal_5").close();
    const { review } = data;

    const updatedReviewInfo = {
      rating,
      review,
    };

    axiosSecure
      .patch(`/review/${reviewData._id}`, updatedReviewInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Review updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setReviewData("");
          setRating(0);
          refetch();
        }
      });
  };

  useEffect(() => {
    if (reviewData) {
      reset({
        rating: reviewData.rating,
        review: reviewData.review,
      });
    }
  }, [reviewData, reset]);

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>My Reviews - ScholarMS</title>
      </Helmet>
      {reviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="dark:text-white">
              <tr>
                <th>Scholarship</th>
                <th>University</th>
                <th>Review</th>
                <th>Review date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={idx}>
                  <td>
                    <h4>{review?.scholarship_name}</h4>
                  </td>
                  <td>
                    <h4>{review?.university_name}</h4>
                  </td>
                  <td>
                    <h4>
                      {review?.review?.length > 40
                        ? `${review.review.slice(0, 40)}...`
                        : review?.review}
                    </h4>
                  </td>
                  <td>
                    <h4>{formatDate(new Date(review?.review_date), "P")}</h4>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(review?._id)}
                        className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setReviewData(review);
                          document.getElementById("my_modal_5").showModal();
                        }}
                        className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* modal */}
          <dialog id="my_modal_5" className="modal sm:modal-middle">
            <div className="modal-box dark:bg-c">
              <form onSubmit={handleSubmit(onSubmit)} action="">
                {reviewData.rating && (
                  <>
                    <div className="flex justify-center gap-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          onClick={() => handleStarClick(star)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={star <= rating ? "gold" : "gray"}
                          className="w-8 h-8 cursor-pointer"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    {errorMessage && (
                      <p className="text-center text-red-500">{errorMessage}</p>
                    )}
                  </>
                )}
                {reviewData.review && (
                  <>
                    <textarea
                      placeholder="Review"
                      defaultValue={reviewData.review}
                      className="mt-5 w-full h-40 border-2 border-black dark:bg-c p-3 rounded-xl"
                      {...register("review", {
                        required: "Review is required",
                      })}
                    ></textarea>
                    {errors.review && (
                      <p className="text-red-500">{errors.review.message}</p>
                    )}
                  </>
                )}
                <div className="flex justify-center mt-5">
                  <button className="bg-black text-white dark:text-p py-2 px-4 font-semibold rounded-md">
                    Update Review
                  </button>
                </div>
              </form>
              <div>
                <button
                  onClick={() => {
                    setReviewData("");
                    document.getElementById("my_modal_5").close();
                  }}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-center md:text-left">
            Your Reviews Not Found
          </h2>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
