import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ScholarshipEditModal from "../modal/ScholarshipEditModal";
import { useState } from "react";
import Lottie from "lottie-react";
import no from "../assets/lottie/no.json";
import { Helmet } from "react-helmet-async";

const ManageScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarshipData, setScholarshipData] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/manage-scholarship");
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarship/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Scholarship has been deleted.",
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
    <div className="mx-5 md:mx-0 dark:text-p">
      <Helmet>
        <title>Manage Scholarship - ScholarMS</title>
      </Helmet>
      {scholarships.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="dark:text-white">
              <tr>
                <th>Scholarship</th>
                <th>University</th>
                <th>Subject</th>
                <th>Degree</th>
                <th>Application Fees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship, idx) => (
                <tr key={idx}>
                  <td>
                    <h4>{scholarship?.scholarship_name}</h4>
                  </td>
                  <td>
                    <h4>{scholarship?.university_name}</h4>
                  </td>
                  <td>
                    <h4>{scholarship?.subject_category}</h4>
                  </td>
                  <td>
                    <h4>{scholarship?.degree}</h4>
                  </td>
                  <td>
                    <h4>{scholarship?.application_fee}</h4>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <Link to={`/dashboard/details/${scholarship?._id}`}>
                        <button>
                          <i className="fa-solid fa-circle-info text-xl"></i>
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setScholarshipData(scholarship);
                          document.getElementById("my_modal_4").showModal();
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square text-xl"></i>
                      </button>
                      <button onClick={() => handleCancel(scholarship?._id)}>
                        <i className="fa-solid fa-trash text-xl"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* modal */}
          <ScholarshipEditModal
            scholarshipData={scholarshipData}
            setScholarshipData={setScholarshipData}
            loading={loading}
            setLoading={setLoading}
            refetch={refetch}
          ></ScholarshipEditModal>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-center md:text-left">
            Scholarships Not Found
          </h2>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarship;
