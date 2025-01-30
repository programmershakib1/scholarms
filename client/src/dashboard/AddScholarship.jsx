import useAxiosSecure from "./../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { imageUpload } from "../utils/utils";
import useAuth from "../hooks/useAuth";

const AddScholarship = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(new Date().toISOString());
  const axiosSecure = useAxiosSecure();
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
      university,
      city,
      country,
      rank,
      tuition_fee,
      application_fee,
      service_charge,
      subject_category,
      scholarship_category,
      degree,
      description,
      stipend,
      image_file,
    } = data;

    const file = image_file[0];
    const image = await imageUpload(file);

    const scholarshipInfo = {
      scholarship_name: name,
      university_name: university,
      city,
      country,
      university_rank: parseInt(rank),
      tuition_fee: parseInt(tuition_fee),
      application_fee: parseInt(application_fee),
      service_charge: parseInt(service_charge),
      subject_category,
      scholarship_category,
      degree,
      deadline,
      description,
      posted_date: new Date().toISOString(),
      posted_email: user.email,
      stipend: parseInt(stipend ? stipend : 0),
      image,
    };

    axiosSecure.post("/scholarship", scholarshipInfo).then((res) => {
      if (res.data.insertedId) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Scholarship added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>Add Scholarship - ScholarMS</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Scholarship Name</span>
            </label>
            <input
              type="text"
              placeholder="Scholarship Name"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("name", {
                required: "Scholarship Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">University Name</span>
            </label>
            <input
              type="text"
              placeholder="University Name"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("university", {
                required: "University Name is required",
              })}
            />
            {errors.university && (
              <p className="text-red-500">{errors.university.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">University City</span>
            </label>
            <input
              type="text"
              placeholder="University City"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("city", {
                required: "University city is required",
              })}
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">University Country</span>
            </label>
            <input
              type="text"
              placeholder="University Country"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("country", {
                required: "University Country is required",
              })}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">University World Rank</span>
            </label>
            <input
              type="number"
              placeholder="University World Rank"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("rank", {
                required: "University World Rank is required",
              })}
            />
            {errors.rank && (
              <p className="text-red-500">{errors.rank.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Tuition Fees</span>
            </label>
            <input
              type="number"
              placeholder="Tuition Fees"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("tuition_fee", {
                required: "Tuition Fees is required",
              })}
            />
            {errors.tuition_fee && (
              <p className="text-red-500">{errors.tuition_fee.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Application Fees</span>
            </label>
            <input
              type="number"
              placeholder="Application Fees"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("application_fee", {
                required: "Application Fees is required",
              })}
            />
            {errors.application_fee && (
              <p className="text-red-500">{errors.application_fee.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Service Charge</span>
            </label>
            <input
              type="number"
              placeholder="Service Charge"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("service_charge", {
                required: "Service Charge is required",
              })}
            />
            {errors.service_charge && (
              <p className="text-red-500">{errors.service_charge.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Subject Category</span>
            </label>
            <select
              defaultValue={""}
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("subject_category", {
                required: "Subject Category is required",
              })}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Agriculture">Agriculture</option>
              <option value="Engineering">Engineering</option>
              <option value="Doctor">Doctor</option>
            </select>
            {errors.subject_category && (
              <p className="text-red-500">{errors.subject_category.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Scholarship Category</span>
            </label>
            <select
              defaultValue={""}
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("scholarship_category", {
                required: "Scholarship Category is required",
              })}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Full-fund">Full-fund</option>
              <option value="Self-fund">Self-fund</option>
              <option value="Partial">Partial</option>
            </select>
            {errors.scholarship_category && (
              <p className="text-red-500">
                {errors.scholarship_category.message}
              </p>
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
              <span className="font-semibold">Application Deadline</span>
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="w-full shadow-md mt-2 p-3 rounded-full dark:bg-c"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Stipend</span>
            </label>
            <input
              type="number"
              placeholder="Stipend (if have)"
              className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
              {...register("stipend")}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Scholarship Description</span>
            </label>
            <textarea
              name=""
              id=""
              placeholder="Scholarship Description"
              className="h-48 shadow-md mt-2 p-3 rounded-xl dark:bg-c"
              {...register("description", {
                required: "Scholarship Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-2">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">University Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1"
              {...register("image_file", {
                required: "University Image is required",
              })}
            />
            {errors.image_file && (
              <p className="text-red-500">{errors.image_file.message}</p>
            )}
          </div>
          <div>
            <button className="w-full bg-black text-white dark:bg-c dark:text-p py-3 md:py-1 px-6 font-bold rounded-md">
              {loading ? (
                <div className="flex justify-center items-center py-2 px-6">
                  <span className="loading loading-spinner text-white"></span>
                </div>
              ) : (
                "Add Scholarship"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
