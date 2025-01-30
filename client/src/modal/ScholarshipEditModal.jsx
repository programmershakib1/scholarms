import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { imageUpload } from "../utils/utils";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ScholarshipEditModal = ({
  scholarshipData,
  setScholarshipData,
  loading,
  setLoading,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const [deadline, setDeadline] = useState(null);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    _id,
    scholarship_name,
    university_name,
    city,
    country,
    university_rank,
    tuition_fee,
    application_fee,
    service_charge,
    subject_category,
    scholarship_category,
    degree,
    description,
    posted_date,
    posted_email,
  } = scholarshipData;

  useEffect(() => {
    if (scholarshipData) {
      setDeadline(
        scholarshipData?.deadline ? new Date(scholarshipData.deadline) : null
      );
      reset({
        name: scholarshipData.scholarship_name,
        university: scholarshipData.university_name,
        city: scholarshipData.city,
        country: scholarshipData.country,
        rank: scholarshipData.university_rank,
        tuition_fee: scholarshipData.tuition_fee,
        application_fee: scholarshipData.application_fee,
        service_charge: scholarshipData.service_charge,
        subject_category: scholarshipData.subject_category,
        scholarship_category: scholarshipData.scholarship_category,
        degree: scholarshipData.degree,
        stipend: scholarshipData?.stipend,
        description: scholarshipData.description,
      });
    }
  }, [scholarshipData, reset]);

  useEffect(() => {
    if (scholarshipData?.image) {
      setImage(scholarshipData.image);
    }
  }, [scholarshipData.image]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

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
      stipend,
      description,
    } = data;

    let imageURL = image;

    if (image instanceof File) {
      imageURL = await imageUpload(image);
    }

    const updatedInfo = {
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
      posted_date,
      posted_email,
      updatedDate: new Date().toISOString(),
      stipend,
      image: imageURL,
    };

    axiosSecure.patch(`/scholarship/${_id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Scholarship update successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        document.getElementById("my_modal_4").close();
        reset();
        refetch();
      }
    });
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-c">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Scholarship Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={scholarship_name}
                  placeholder="Scholarship Name"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={university_name}
                  placeholder="University Name"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={city}
                  placeholder="University city"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={country}
                  placeholder="University Country"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={university_rank}
                  placeholder="University World Rank"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={tuition_fee}
                  placeholder="Tuition Fees"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={application_fee}
                  placeholder="Application Fees"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
                  {...register("application_fee", {
                    required: "Application Fees is required",
                  })}
                />
                {errors.application_fee && (
                  <p className="text-red-500">
                    {errors.application_fee.message}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Service Charge</span>
                </label>
                <input
                  type="number"
                  defaultValue={service_charge}
                  placeholder="Service Charge"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
                  {...register("service_charge", {
                    required: "Service Charge is required",
                  })}
                />
                {errors.service_charge && (
                  <p className="text-red-500">
                    {errors.service_charge.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-5">
              {subject_category && (
                <div className="w-full flex flex-col">
                  <label>
                    <span className="font-semibold">Subject Category</span>
                  </label>
                  <select
                    defaultValue={subject_category}
                    className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                    <p className="text-red-500">
                      {errors.subject_category.message}
                    </p>
                  )}
                </div>
              )}
              {scholarship_category && (
                <div className="w-full flex flex-col">
                  <label>
                    <span className="font-semibold">Scholarship Category</span>
                  </label>
                  <select
                    defaultValue={scholarship_category}
                    className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
                    {...register("scholarship_category", {
                      required: "Scholarship Category is required",
                    })}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Full-fund">Full-fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                  {errors.scholarship_category && (
                    <p className="text-red-500">
                      {errors.scholarship_category.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              {degree && (
                <div className="w-full flex flex-col">
                  <label>
                    <span className="font-semibold">Degree</span>
                  </label>
                  <select
                    defaultValue={degree}
                    className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Application Deadline</span>
                </label>
                <DatePicker
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  className="w-full shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={scholarshipData?.stipend}
                  placeholder="Stipend (if have)"
                  className="shadow-md mt-2 p-3 rounded-full dark:bg-black"
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
                  defaultValue={description}
                  placeholder="Scholarship Description"
                  className="h-48 shadow-md mt-2 p-3 rounded-xl  dark:bg-black"
                  {...register("description", {
                    required: "Scholarship Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">University Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button className="bg-black text-white dark:bg-black dark:text-p py-2 px-6 font-bold rounded-md mb-5 md:mb-0">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <span className="loading loading-spinner text-white"></span>
                  </div>
                ) : (
                  "Update Scholarship"
                )}
              </button>
            </div>
          </form>
          <div>
            <button
              onClick={() => {
                setScholarshipData("");
                document.getElementById("my_modal_4").close();
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

ScholarshipEditModal.propTypes = {
  scholarshipData: PropTypes.string,
  setScholarshipData: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  refetch: PropTypes.func,
};

export default ScholarshipEditModal;
