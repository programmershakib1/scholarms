import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { formatDate } from "date-fns";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import no from "../assets/lottie/no.json";
import { Helmet } from "react-helmet-async";

const ManageAppliedApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [modalType, setModalType] = useState("");
  const [scholarshipData, setScholarshipData] = useState();
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
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
    queryKey: ["scholarships", sortBy, filterBy],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/applied-scholarships", {
        params: { sortBy, filterBy },
      });
      return data;
    },
  });

  const handleSortChange = (value) => {
    setSortBy(value);
    if (value === "appliedDateDesc") {
      refetch({ sortBy: "appliedDateDesc" });
    } else if (value === "appliedDateAsc") {
      refetch({ sortBy: "appliedDateAsc" });
    } else if (value === "deadlineAsc") {
      refetch({ sortBy: "deadlineAsc" });
    } else if (value === "deadlineDesc") {
      refetch({ sortBy: "deadlineDesc" });
    }
  };

  const handleFilterChange = (value) => {
    setFilterBy(value);
    refetch();
  };

  const onSubmit = async (data) => {
    document.getElementById("my_modal_5").close();
    const { feedback_message } = data;
    const feedback = {
      feedback: feedback_message,
    };

    axiosSecure
      .patch(`/applied-scholarship/${scholarshipData?._id}`, feedback)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Feedback added/updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setScholarshipData("");
          refetch();
        }
      });
  };

  const handleStatus = (id, status) => {
    axiosSecure
      .patch(`/application-status-change/${id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status updated successful",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };

  const handleCancel = (scholarship) => {
    if (scholarship.status === "Rejected") {
      return toast.error("this application already rejected");
    }
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/applied-scholarship-cancel/${scholarship._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Canceled!",
                text: "Application cancel successfully",
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
        <title>Manage Applied Application - ScholarMS</title>
      </Helmet>
      {scholarships.length > 0 ? (
        <div>
          <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
            <select
              className="border-2 border-black rounded-lg p-2  dark:bg-black"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort by Applied Date</option>
              <option value="appliedDateDesc">
                Applied Date (Newest First)
              </option>
              <option value="appliedDateAsc">
                Applied Date (Oldest First)
              </option>
            </select>
            <select
              className="border-2 border-black rounded-lg  dark:bg-black p-2"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort by Deadline</option>
              <option value="deadlineAsc">Deadline (Earliest First)</option>
              <option value="deadlineDesc">Deadline (Latest First)</option>
            </select>
            <select
              className="border-2 border-black rounded-lg p-2  dark:bg-black"
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">Filter By Available</option>
              <option value="active">Active Scholarships</option>
              <option value="expired">Expired Scholarships</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="dark:text-white">
                <tr>
                  <th>Scholarship Name</th>
                  <th>University Name</th>
                  <th>Subject Category</th>
                  <th>Degree</th>
                  <th>Applied Date</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship, idx) => (
                  <tr key={idx}>
                    <td>
                      <h2>{scholarship?.scholarship_name}</h2>
                    </td>
                    <td>
                      <h2>{scholarship?.university_name}</h2>
                    </td>
                    <td>
                      <p>{scholarship?.subject_category}</p>
                    </td>
                    <td>
                      <p>{scholarship?.degree}</p>
                    </td>
                    <td>
                      <h2>
                        {formatDate(new Date(scholarship?.applied_date), "P")}
                      </h2>
                    </td>
                    <td>
                      <h2>
                        {formatDate(new Date(scholarship?.deadline), "P")}
                      </h2>
                    </td>
                    <td>
                      <select
                        defaultValue={scholarship?.status}
                        onChange={(e) =>
                          handleStatus(scholarship._id, e.target.value)
                        }
                        className="border border-black pl-1 rounded-md  dark:bg-black"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setScholarshipData(scholarship);
                            setModalType("details");
                            document.getElementById("my_modal_5").showModal();
                          }}
                          className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setScholarshipData(scholarship);
                            setModalType("feedback");
                            document.getElementById("my_modal_5").showModal();
                          }}
                          className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                        >
                          Feedback
                        </button>
                        <button
                          onClick={() => handleCancel(scholarship)}
                          className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* modal */}
            <dialog id="my_modal_5" className="modal sm:modal-middle">
              <div className="modal-box  dark:bg-c">
                {modalType === "details" && scholarshipData && (
                  <div>
                    <div className="flex items-center gap-3">
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={scholarshipData?.applicant_photo}
                        alt=""
                      />
                      <div>
                        <h4 className="text-xl font-bold">
                          {scholarshipData?.user_name}
                        </h4>
                        <p>{scholarshipData?.user_email}</p>
                      </div>
                    </div>
                    <h4 className="font-semibold mt-3">
                      Scholarship :{" "}
                      <span className="font-normal">
                        {scholarshipData?.scholarship_name}
                      </span>
                    </h4>
                    <h4 className="font-semibold mt-2">
                      University :{" "}
                      <span className="font-normal">
                        {scholarshipData?.university_name}
                      </span>
                    </h4>

                    <h4>
                      Category :{" "}
                      <span className="font-normal">
                        {scholarshipData?.scholarship_category}
                      </span>
                    </h4>
                    <h4>
                      Degree :{" "}
                      <span className="font-normal">
                        {scholarshipData?.degree}
                      </span>
                    </h4>

                    <h4>
                      Fee :{" "}
                      <span className="font-normal">
                        ${scholarshipData?.application_fee}
                      </span>
                    </h4>
                    <h4>
                      deadline :{" "}
                      <span className="font-normal">
                        {formatDate(
                          new Date(scholarshipData?.deadline),
                          "yyyy-MM-dd"
                        )}
                      </span>
                    </h4>
                    <h4>
                      Charge :{" "}
                      <span className="font-normal">
                        ${scholarshipData?.service_charge}
                      </span>
                    </h4>
                    <h4>
                      Status :{" "}
                      <span className="font-normal">
                        {scholarshipData?.status}
                      </span>
                    </h4>
                  </div>
                )}
                {modalType === "feedback" && scholarshipData && (
                  <form onSubmit={handleSubmit(onSubmit)} action="">
                    <textarea
                      placeholder="Feedback"
                      className="w-full h-40 border-2 border-black mt-2 p-3 rounded-xl  dark:bg-black"
                      {...register("feedback_message", {
                        required: "Feedback is required",
                      })}
                    ></textarea>
                    {errors.feedback_message && (
                      <p className="text-red-500">
                        {errors.feedback_message.message}
                      </p>
                    )}
                    <div className="flex justify-center mt-5">
                      <button className="bg-black text-white dark:text-p py-2 px-4 font-semibold rounded-md">
                        Feedback
                      </button>
                    </div>
                  </form>
                )}
                <div>
                  <button
                    onClick={() => {
                      setScholarshipData("");
                      setModalType("");
                      document.getElementById("my_modal_5").close();
                    }}
                    className="bg-black text-white dark:text-p py-1.5 px-4 font-semibold rounded-md mt-3"
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-center md:text-left">
            Applied Scholarship Not Found
          </h2>
          <button
            className="bg-black text-white font-semibold py-1 px-4 rounded-md mt-5"
            onClick={() => handleFilterChange("")}
          >
            Back
          </button>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppliedApplication;
