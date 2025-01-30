import useAxiosSecure from "./../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { imageUpload } from "../utils/utils";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const SpecialForm = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userInfo] = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const {
      name,
      phone,
      village,
      district,
      country,
      gender,
      degree,
      ssc_result,
      hsc_result,
      study_gap,
      photo,
    } = data;

    const file = photo[0];
    const image = await imageUpload(file);

    const appliedInfo = {
      name,
      phone_number: parseInt(phone),
      village,
      district,
      country,
      gender,
      degree,
      ssc_result: parseInt(ssc_result),
      hsc_result: parseInt(hsc_result),
      study_gap,
      applicant_photo: image,
      user_email: user?.email,
      user_id: userInfo?._id,
      applied_date: new Date().toISOString(),
      status: "Pending",
    };

    axiosSecure.post("/special-scholarship", appliedInfo).then((res) => {
      if (res.data.insertedId) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Scholarship apply successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/specialDetails");
      }
    });
  };

  return (
    <div className="mx-5 md:mx-0 mt-10">
      <Helmet>
        <title>Exclusive Scholarships Apply - ScholarMS</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("phone", {
                required: "Phone Number is required",
              })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Village</span>
            </label>
            <input
              type="text"
              placeholder="Village"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("village", {
                required: "Village is required",
              })}
            />
            {errors.village && (
              <p className="text-red-500">{errors.village.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">District</span>
            </label>
            <input
              type="text"
              placeholder="District"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("district", {
                required: "District is required",
              })}
            />
            {errors.district && (
              <p className="text-red-500">{errors.district.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Country</span>
            </label>
            <input
              type="text"
              placeholder="Country"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("country", {
                required: "Country is required",
              })}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Gender</span>
            </label>
            <select
              defaultValue={""}
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("gender", {
                required: "Gender is required",
              })}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">SSC Result</span>
            </label>
            <input
              type="number"
              placeholder="SSC Result"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("ssc_result", {
                required: "SSC Result is required",
              })}
            />
            {errors.ssc_result && (
              <p className="text-red-500">{errors.ssc_result.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">HSC Result</span>
            </label>
            <input
              type="number"
              placeholder="HSC Result"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("hsc_result", {
                required: "HSC Result is required",
              })}
            />
            {errors.hsc_result && (
              <p className="text-red-500">{errors.hsc_result.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Degree</span>
            </label>
            <select
              defaultValue={""}
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("degree", {
                required: "Degree is required",
              })}
            >
              <option value="" disabled>
                Select Degree
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
            {errors.degree && (
              <p className="text-red-500">{errors.degree.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Study Gap</span>
            </label>
            <select
              defaultValue={"none"}
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("study_gap")}
            >
              <option value={"none"} disabled>
                Select Gap (Optional)
              </option>
              <option value="none">None</option>
              <option value="5 Month">5 Month</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Applicant Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1"
              {...register("photo", {
                required: "Applicant Photo is required",
              })}
            />
            {errors.photo && (
              <p className="text-red-500">{errors.photo.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-black text-white dark:bg-c py-2 px-6 font-bold rounded-md mt-5 md:mt-0">
            {loading ? (
              <div className="flex justify-center items-center px-2">
                <span className="loading loading-spinner text-white"></span>
              </div>
            ) : (
              "Apply"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpecialForm;
