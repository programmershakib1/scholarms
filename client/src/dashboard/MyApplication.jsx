import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";
import no from "../assets/lottie/no.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [scholarshipData, setScholarshipData] = useState("");
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["scholarships", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/applied-scholarships/${user?.email}`
      );
      return data;
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applied-scholarship/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Your application has been canceled.",
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

    const reviewInfo = {
      rating: parseInt(rating),
      review: data.review,
      review_date: new Date().toISOString(),
      scholarship_name: scholarshipData.scholarship_name,
      university_name: scholarshipData.university_name,
      subject_category: scholarshipData.subject_category,
      scholarship_id: scholarshipData.scholarship_id,
      user_name: user.displayName,
      user_email: user.email,
      user_image: user.photoURL,
    };

    axiosSecure.post("/review", reviewInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review added successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setScholarshipData("");
        setRating(0);
        refetch();
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
    <div className="mx-5 md:mx-0 dark:text-p">
      <Helmet>
        <title>My Application - ScholarMS</title>
      </Helmet>
      {scholarships.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="dark:text-white">
              <tr>
                <th>University Name</th>
                <th>University Address</th>
                <th>Feedback</th>
                <th>Subject Category</th>
                <th>Degree</th>
                <th>Fees</th>
                <th>Charge</th>
                <th>Status</th>
                <th>Action</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship, idx) => (
                <tr key={idx}>
                  <td>
                    <h2>{scholarship?.university_name}</h2>
                  </td>
                  <td>
                    <span>{scholarship?.university_country}</span>
                  </td>
                  <td>
                    <p>
                      {scholarship?.feedback.length > 40
                        ? `${scholarship.feedback.slice(0, 40)}...`
                        : scholarship?.feedback}
                    </p>
                  </td>
                  <td>
                    <p>{scholarship?.subject_category}</p>
                  </td>
                  <td>
                    <p>{scholarship?.degree}</p>
                  </td>
                  <td>
                    <p>{scholarship?.application_fee}</p>
                  </td>
                  <td>
                    <p>{scholarship?.service_charge}</p>
                  </td>
                  <td>
                    <p>{scholarship?.status}</p>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Link
                        to={`/dashboard/details/${scholarship?.scholarship_id}`}
                      >
                        <button className="btn btn-xs bg-black text-white dark:text-p dark:border-p">
                          Details
                        </button>
                      </Link>
                      <Link
                        to={`/dashboard/applicationEdit/${scholarship?._id}`}
                      >
                        <button className="btn btn-xs bg-black text-white dark:text-p dark:border-p">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleCancel(scholarship?._id)}
                        className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setScholarshipData(scholarship);
                        document.getElementById("my_modal_5").showModal();
                      }}
                      className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* modal */}
          <dialog id="my_modal_5" className="modal sm:modal-middle">
            <div className="modal-box dark:bg-c">
              <form onSubmit={handleSubmit(onSubmit)} action="">
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

                <textarea
                  placeholder="Review"
                  className="mt-5 w-full h-40 border-2 border-black  dark:bg-black p-3 rounded-xl"
                  {...register("review", {
                    required: "Review is required",
                  })}
                ></textarea>
                {errors.review && (
                  <p className="text-red-500">{errors.review.message}</p>
                )}
                <div className="flex justify-center mt-5">
                  <button className="bg-black text-white dark:text-p py-2 px-4 font-semibold rounded-md">
                    Add Review
                  </button>
                </div>
              </form>
              <div>
                <button
                  onClick={() => {
                    setScholarshipData("");
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
            Your Applied Scholarship Not Found
          </h2>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplication;
