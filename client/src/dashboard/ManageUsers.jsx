import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", roleFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users", {
        params: { role: roleFilter },
      });
      return data;
    },
  });

  const handleRole = (id, newRole) => {
    axiosSecure.patch(`/user/${id}`, { role: newRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User role updated successful",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleDeleteUser = (userInfo) => {
    const { _id, email } = userInfo;

    if (email === user?.email) {
      return toast.error("You cannot remove yourself.");
    } else {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/user/${_id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Canceled!",
                text: "User has been deleted",
                icon: "success",
              });
            }
          });
        }
      });
    }
  };

  const handleFilterChange = (e) => {
    setRoleFilter(e.target.value);
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
        <title>Manage Users - ScholarMS</title>
      </Helmet>
      <div className="flex justify-end">
        <select
          onChange={handleFilterChange}
          value={roleFilter}
          className="border-2 border-black dark:bg-black mt-2 p-2 rounded-md"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="dark:text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <h2>{user?.name}</h2>
                </td>
                <td>
                  <h2>{user?.email}</h2>
                </td>
                <td>
                  <select
                    name="role"
                    defaultValue={user?.role}
                    onChange={(e) => handleRole(user._id, e.target.value)}
                    className="shadow-md mt-2 p-3 rounded-md dark:bg-black"
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
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

export default ManageUsers;
