import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "./../hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: adminAllInfo = {}, isLoading: adminLoading } = useQuery({
    queryKey: ["adminAllInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-all-info");
      return data;
    },
  });

  const { data: userAllInfo = {}, isLoading: userLoading } = useQuery({
    queryKey: ["userAllInfo", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-all-info/${user?.email}`);
      return data;
    },
  });

  if (adminLoading || userLoading) {
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const {
    users,
    scholarships,
    appliedScholarships,
    reviews,
    successfulApplications,
    specialScholarships,
  } = adminAllInfo;

  const {
    appliedScholarship,
    review,
    successfulApplication,
    specialScholarship,
    userInfo,
  } = userAllInfo;

  console.log(userAllInfo);
  return (
    <div className="mx-5 md:mx-0">
      <h2 className="text-2xl font-bold">Welcome {user?.displayName}</h2>
      {userInfo?.role === "admin" && (
        <div className="grid md:grid-cols-3 gap-10 mt-5">
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Users</h4>
            <h4 className="text-4xl mt-2">{users.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Scholarships</h4>
            <h4 className="text-4xl mt-2">{scholarships.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Applied Scholarships</h4>
            <h4 className="text-4xl mt-2">{appliedScholarships.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Reviews</h4>
            <h4 className="text-4xl mt-2">{reviews.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Success</h4>
            <h4 className="text-4xl mt-2">{successfulApplications.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Special Scholarships</h4>
            <h4 className="text-4xl mt-2">{specialScholarships.length}</h4>
          </div>
        </div>
      )}

      {userInfo?.role === "user" && (
        <div className="grid md:grid-cols-3 gap-10 mt-5">
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>Applications</h4>
            <h4 className="text-4xl mt-2">
              {appliedScholarship ? appliedScholarship.length : 0}
            </h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>Reviews</h4>
            <h4 className="text-4xl mt-2">{review ? review.length : 0}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>Success</h4>
            <h4 className="text-4xl mt-2">{successfulApplication? successfulApplication.length : 0}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Reviews</h4>
            <h4 className="text-4xl mt-2">{reviews.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Success</h4>
            <h4 className="text-4xl mt-2">{successfulApplications.length}</h4>
          </div>
          <div className="border-2 p-8 rounded-xl text-2xl text-center font-row font-bold">
            <h4>All Special Scholarships</h4>
            <h4 className="text-4xl mt-2">{specialScholarships.length}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
