import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { formatDate } from "date-fns";

const SuccessClient = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: successApplications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["success-applications"],
    queryFn: async () => {
      const { data } = await axiosSecure("/success-applications");
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
        axiosSecure.delete(`/success-application/${id}`).then((res) => {
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
        <title>Success Client - ScholarMS</title>
      </Helmet>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="dark:text-white">
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {successApplications.map((success, idx) => (
              <tr key={idx}>
                <td>
                  <h2>{success?.applicantName}</h2>
                </td>
                <td>
                  <h2>{success?.university}</h2>
                </td>
                <td>{formatDate(new Date(success?.completionDate), "P")}</td>
                <td>
                  <button
                    onClick={() => handleDelete(success?._id)}
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
    </div>
  );
};

export default SuccessClient;
