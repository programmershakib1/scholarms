import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "./../hooks/useAuth";
import no from "../assets/lottie/no.json";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Lottie from "lottie-react";

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

  const { appliedScholarship, review, successfulApplication, userInfo } =
    userAllInfo;

  const scholarshipsData = scholarships.slice(0, 10).map((scholarship) => {
    return {
      name: scholarship.scholarship_name,
      applicationFee: scholarship.application_fee,
      pv: scholarship.service_charge,
      amt: scholarship.university_rank,
    };
  });

  const scholarshipData = appliedScholarship.slice(0, 10).map((scholarship) => {
    return {
      name: scholarship.scholarship_name,
      applicationFee: scholarship.application_fee,
      pv: scholarship.service_charge,
      amt: scholarship.university_city,
    };
  });

  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "red",
    "pink",
    "aqua",
    "darkviolet",
    "springgreen",
    "black",
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    // eslint-disable-next-line react/prop-types
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="mx-5 md:mx-0">
      <h2 className="text-2xl font-bold">Welcome {user?.displayName}</h2>
      {userInfo?.role !== "user" && (
        <div className="grid md:grid-cols-3 gap-5 mt-5">
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
        <div className="grid md:grid-cols-3 gap-5 mt-5">
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
            <h4 className="text-4xl mt-2">
              {successfulApplication ? successfulApplication.length : 0}
            </h4>
          </div>
        </div>
      )}
      {userInfo?.role !== "user" && (
        <div className="mt-10">
          <h2 className="my-3 font-bold">All Scholarships</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={scholarshipsData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="applicationFee"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {scholarshipsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {appliedScholarship.length > 0 && userInfo?.role === "user" && (
        <div className="mt-10">
          <h2 className="my-3 font-bold">Applied Scholarships</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={scholarshipData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="applicationFee"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {scholarshipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {appliedScholarship.length === 0 && userInfo?.role === "user" && (
        <div>
          <h2 className="font-bold text-center md:text-left mt-10">
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

export default DashboardPage;
