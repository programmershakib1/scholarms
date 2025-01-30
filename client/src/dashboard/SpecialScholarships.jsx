import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import no from "../assets/lottie/no.json";
import { Helmet } from "react-helmet-async";

const SpecialScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: specialScholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["specialScholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/special-scholarships");
      return data;
    },
  });

  const handleStatus = (id, status) => {
    axiosSecure.patch(`/special-scholarship/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Status change successful",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

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
        axiosSecure.delete(`/special-scholarship/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Application has been deleted",
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
        <title>Special Scholarship - ScholarMS</title>
      </Helmet>
      {specialScholarships.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table">
            <thead className="dark:text-white">
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Country</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {specialScholarships.map((special, idx) => (
                <tr key={idx}>
                  <td>
                    <h2>{special?.name}</h2>
                  </td>
                  <td>
                    <h2>{special?.phone_number}</h2>
                  </td>
                  <td>
                    <h2>{special?.user_email}</h2>
                  </td>
                  <td>
                    <h2>{special?.country}</h2>
                  </td>
                  <td>
                    <select
                      name="role"
                      defaultValue={special?.status}
                      onChange={(e) =>
                        handleStatus(special._id, e.target.value)
                      }
                      className="shadow-md mt-2 p-3 rounded-md dark:bg-black"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(special?._id)}
                      className="btn btn-xs bg-black text-white dark:text-p dark:border-p"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-center md:text-left">
            Special Scholarship Applicant Not Found
          </h2>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialScholarships;
