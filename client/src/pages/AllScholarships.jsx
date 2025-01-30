import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ScholarshipCard from "../components/ScholarshipCard";
import { useState } from "react";
import Lottie from "lottie-react";
import no from "../assets/lottie/no.json";
import { Helmet } from "react-helmet-async";

const AllScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 6;
  const [search, setSearch] = useState("");
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [feeFilter, setFeeFilter] = useState("");

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query) {
      const { data } = await axiosPublic.get(
        `/scholarships?search=${query}&feeFilter=${feeFilter}`
      );
      setFilteredScholarships(data.scholarships || []);
    } else {
      setFilteredScholarships([]);
    }
  };

  const { data = {}, isLoading } = useQuery({
    queryKey: ["scholarships", page, feeFilter],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/scholarships?page=${page}&limit=${limit}&feeFilter=${feeFilter}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const handleFeeFilter = (e) => {
    setFeeFilter(e.target.value);
    setPage(1);
  };

  const scholarships = search ? filteredScholarships : data.scholarships || [];
  const currentPage = data.currentPage || 1;
  const totalPages = data.totalPages || 1;

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>All Scholarships - ScholarMS</title>
      </Helmet>
      <div className="flex gap-1 mb-5">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search"
          className="w-full md:w-[38%] lg:w-[27%] border-2 border-black py-1.5 pl-2 pr-2 rounded-md dark:bg-c"
        />
        <button className="bg-black text-white py-1.5 px-4 rounded-md font-semibold">
          Search
        </button>
        <select
          value={feeFilter}
          onChange={handleFeeFilter}
          className="border-2 border-black dark:bg-c py-1.5 px-2 rounded-md"
        >
          <option value="">Filter by Fee</option>
          <option value="free">Free</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      {scholarships.length === 0 ? (
        <div>
          <h2 className="font-bold text-center md:text-left">
            Your result Not Found. No Scholarship Available
          </h2>
          <div>
            <Lottie animationData={no} className="w-full md:h-[400px]"></Lottie>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {scholarships.map((scholarship, idx) => (
            <ScholarshipCard
              key={idx}
              scholarship={scholarship}
            ></ScholarshipCard>
          ))}
        </div>
      )}
      {!search && scholarships.length > 0 && (
        <div className="flex justify-center items-center gap-3 mt-5">
          <button
            className="btn btn-sm bg-black text-white dark:text-white"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm bg-black text-white dark:text-white"
            onClick={() =>
              setPage((prev) => (currentPage < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
