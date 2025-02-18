import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../utils/utils";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState();
  const [uploadCover, setUploadCover] = useState();
  const [loading, setLoading] = useState(false);

  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-scholarship/${user?.email}`);
      return data;
    },
  });

  const { userInfo } = data;

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const name = e.target.name.value.trim();

    const image = e.target.image.files[0];

    const cover = e.target.cover.files[0];

    if (!name && !image && !cover) {
      setLoading(false);
      return toast.error("Change at least 1 Field");
    }

    const imageUrl = image ? await imageUpload(image) : userInfo?.photo;
    const coverUrl = cover ? await imageUpload(cover) : userInfo?.cover;

    const updatedInfo = {
      name: name || user?.displayName,
      email: user?.email,
      photo: imageUrl,
      cover: coverUrl,
      lastSignIn: new Date().toISOString(),
    };

    axiosSecure.patch("/update-profile", updatedInfo).then(() => {
      refetch();
    });

    updateProfile(auth.currentUser, {
      displayName: name ? name : user?.displayName,
      photoURL: imageUrl ? imageUrl : user?.photoURL,
    })
      .then(() => {
        e.target.reset();
        setUploadImage(null);
        setUploadCover(null);
        setLoading(false);
        setEditMode(false);
        toast.success("Profile update successful");
        setUser({ displayName: name, photoURL: imageUrl });
      })
      .catch((error) => {
        e.target.reset();
        setUploadImage(null);
        setUploadCover(null);
        setLoading(false);
        toast.error(error?.code);
      });
  };

  return (
    <div className="mx-5 md:mx-0 dark:text-p">
      <Helmet>
        <title>Profile - ScholarMS</title>
      </Helmet>
      {!editMode ? (
        <>
          <div className="relative">
            <div className="w-full h-40 md:h-52 lg:h-80 border-2 border-black">
              {userInfo?.cover ? (
                <img className="w-full h-full" src={userInfo?.cover} alt="" />
              ) : (
                ""
              )}
            </div>
            <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full absolute left-5 -bottom-20 lg:-bottom-24">
              <img
                className="w-full h-full rounded-full object-cover border-2 border-black animate__animated animate__zoomIn"
                src={userInfo?.photo}
                alt=""
              />
            </div>
          </div>
          <div className="mt-24 lg:mt-28 pl-5">
            <h2 className="text-2xl font-semibold">
              {userInfo?.name}
              {userInfo?.role === "admin" && (
                <span className="font-normal pl-2">
                  ({userInfo?.role === "admin" ? userInfo?.role : ""})
                </span>
              )}
              {userInfo?.role === "moderator" && (
                <span className="font-normal pl-2">
                  ({userInfo?.role === "moderator" ? userInfo?.role : ""})
                </span>
              )}
              <i
                onClick={() => setEditMode(true)}
                className="fa-solid fa-pen-to-square pl-5"
              ></i>
            </h2>
            <p className="font-semibold">{userInfo?.email}</p>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} action="">
          <Helmet>
            <title>Update Profile - ScholarMS</title>
          </Helmet>
          <div className="relative">
            <div className="w-full h-40 md:h-52 lg:h-80 border-2 border-black">
              <label
                htmlFor="coverPhoto"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                {uploadCover ? (
                  <img
                    className="w-full h-full"
                    src={uploadCover?.url}
                    alt="Uploaded Cover"
                  />
                ) : (
                  <h4 className="text-xl font-semibold">Upload Cover Photo</h4>
                )}
              </label>
              <input
                id="coverPhoto"
                type="file"
                name="cover"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setUploadCover({
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </div>
            <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full absolute left-5 -bottom-[85px] lg:-bottom-28 border-2 border-black">
              <label
                htmlFor="profilePhoto"
                className="w-full h-full flex items-center justify-center rounded-full cursor-pointer"
              >
                {uploadImage ? (
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={uploadImage?.url}
                    alt="Uploaded profile"
                  />
                ) : (
                  <h4 className="text-xl font-semibold">Profile</h4>
                )}
              </label>
              <input
                id="profilePhoto"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setUploadImage({
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-end text-2xl font-bold gap-1 mt-3">
            <span>!</span>
            <i
              onClick={() => setEditMode(false)}
              className="fa-solid fa-pen-to-square"
            ></i>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto mt-20 md:mt-32">
              <label>
                <span className="font-semibold">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
              />
            </div>
            <button className="bg-black dark:bg-c py-0.5 px-6 text-white dark:text-p rounded-full font-bold mt-5">
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner text-white"></span>
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
