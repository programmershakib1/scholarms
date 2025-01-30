import useAxiosSecure from "./../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { imageUpload } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ApplicationEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: scholarship = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/applied-scholarship/${id}`);
      return data;
    },
  });

  const {
    _id,
    phone_number,
    village,
    district,
    country,
    gender,
    degree,
    ssc_result,
    hsc_result,
    study_gap,
    scholarship_name,
    university_name,
    university_city,
    university_country,
    application_fee,
    service_charge,
    scholarship_category,
    subject_category,
    deadline,
    user_name,
    user_email,
    user_id,
    scholarship_id,
    applied_date,
    feedback,
    status,
  } = scholarship;

  useEffect(() => {
    if (scholarship && Object.keys(scholarship).length > 0) {
      reset(scholarship);
    }
  }, [scholarship, reset]);

  useEffect(() => {
    if (scholarship?.applicant_photo) {
      setPhoto(scholarship.applicant_photo);
    }
  }, [scholarship.applicant_photo]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const {
      phone,
      village,
      district,
      country,
      gender,
      degree,
      ssc_result,
      hsc_result,
      study_gap,
    } = data;

    let photoURL = photo;

    if (photo instanceof File) {
      photoURL = await imageUpload(photo);
    }

    const updatedInfo = {
      phone_number: parseInt(phone),
      village,
      district,
      country,
      gender,
      degree,
      ssc_result: parseInt(ssc_result),
      hsc_result: parseInt(hsc_result),
      study_gap,
      applicant_photo: photoURL,
      scholarship_name,
      university_name,
      university_city,
      university_country,
      application_fee: parseInt(application_fee),
      service_charge: parseInt(service_charge),
      subject_category,
      scholarship_category,
      deadline,
      user_name,
      user_email,
      user_id,
      scholarship_id,
      applied_date,
      updated_date: new Date().toISOString(),
      feedback,
      status,
    };

    axiosSecure.patch(`/update-scholarship/${_id}`, updatedInfo).then((res) => {
      if (res.data.status === false) {
        setLoading(false);
        toast.error(res.data.message);
        return;
      }
      if (res.data.modifiedCount > 0) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Scholarship update successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        refetch();
        navigate("/dashboard/myApplication");
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
    <div className="mx-5 my-5 dark:text-p">
      <Helmet>
        <title>Update Apply Info - ScholarMS</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Phone Number</span>
            </label>
            <input
              type="number"
              defaultValue={phone_number}
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
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Village</span>
            </label>
            <input
              type="text"
              defaultValue={village}
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
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">District</span>
            </label>
            <input
              type="text"
              defaultValue={district}
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
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Country</span>
            </label>
            <input
              type="text"
              defaultValue={country}
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
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {gender && (
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Gender</span>
              </label>
              <select
                defaultValue={gender}
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
          )}
          {degree && (
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Degree</span>
              </label>
              <select
                defaultValue={degree}
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
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">SSC Result</span>
            </label>
            <input
              type="number"
              defaultValue={ssc_result}
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
              defaultValue={hsc_result}
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
          {study_gap && (
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Study Gap</span>
              </label>
              <select
                defaultValue={study_gap}
                className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
                {...register("study_gap")}
              >
                <option value="" disabled>
                  Select Gap (Optional)
                </option>
                <option value="none">None</option>
                <option value="5 Month">5 Month</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
              </select>
            </div>
          )}
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">University Name</span>
            </label>
            <input
              type="text"
              placeholder="University Name"
              value={university_name}
              disabled
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("university")}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {subject_category && (
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Subject Category</span>
              </label>
              <select
                value={subject_category}
                disabled
                className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
                {...register("subject_category")}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
          )}
          {scholarship_category && (
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Scholarship Category</span>
              </label>
              <select
                value={scholarship_category}
                disabled
                className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
                {...register("scholarship_category")}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Full-fund">Full-fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-3">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Applicant Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1"
            />
          </div>
          <div>
            <button className="bg-black text-white dark:bg-c dark:text-p py-2 px-6 font-bold rounded-md mt-2">
              {loading ? (
                <div className="flex justify-center items-center px-3">
                  <span className="loading loading-spinner text-white"></span>
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationEdit;
