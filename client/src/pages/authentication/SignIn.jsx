import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const SignIn = () => {
  const {
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    setEmailValue,
    locations,
    setLocations,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState(false);
  const [mCredential, setMCredential] = useState(false);
  const [adminEmailCopied, setAdminEmailCopied] = useState(false);
  const [adminPasswordCopied, setAdminPasswordCopied] = useState(false);
  const [modEmailCopied, setModEmailCopied] = useState(false);
  const [modPasswordCopied, setModPasswordCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSignIn(email, password)
      .then((result) => {
        e.target.reset();
        setUser(result?.user);
        setLoading(false);
        toast.success("User sign in successful");
        if (locations) {
          navigate(locations);
        } else {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.code);
      });
  };

  const handleEmail = () => {
    setEmailValue("");
    const email = emailRef.current.value;
    if (!email.includes("@") && !email == "") {
      return toast.error("Please provide a valid mail");
    } else {
      setEmailValue(email);
    }
  };

  const handleLocations = () => {
    setLocations(location.state);
  };

  const handleCopy = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 md:mt-20">
      <Helmet>
        <title>SignIn - ScholarMS</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
          <label>
            <span className="font-semibold">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto mt-2">
          <label>
            <span className="font-semibold">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <button>
          <Link
            onClick={handleEmail}
            to="/forgetPassword"
            className="text-xs py-2 hover:underline"
          >
            Forget password?
          </Link>
        </button>
        <button className="bg-black py-0.5 px-6 text-white dark:bg-c rounded-full font-bold">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner text-white"></span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <div>
        <p className="pt-2 text-center text-sm font-semibold">
          Don&apos;t have an Account?
          <Link to="/signUp" onClick={handleLocations} className="underline">
            {" "}
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result.user);
                  toast.success("User sign in successful");
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-black py-2 px-6 text-white dark:bg-c rounded-full font-bold mt-5"
          >
            <i className="fa-brands fa-google text-white pr-2"></i>
            Google
          </button>
          <button
            onClick={() => {
              handleGithubLogin()
                .then((result) => {
                  setUser(result.user);
                  toast.success("User sign in successful");
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-black py-2 px-6 text-white dark:bg-c rounded-full font-bold md:mt-5"
          >
            <i className="fa-brands fa-github text-white pr-2"></i>
            Github
          </button>
        </div>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-3 md:gap-10">
        {credential ? (
          <div>
            <p className="flex items-center">
              <span>Email : admin@gmail.com</span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() =>
                  handleCopy("admin@gmail.com", setAdminEmailCopied)
                }
              >
                {adminEmailCopied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy />
                )}
              </span>
            </p>
            <p className="flex items-center">
              <span>Password : adminorg</span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() => handleCopy("adminorg", setAdminPasswordCopied)}
              >
                {adminPasswordCopied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy />
                )}
              </span>
            </p>
          </div>
        ) : (
          <button
            onClick={() => setCredential(true)}
            className="border-2 border-black px-10 py-2.5 rounded-full font-bold"
          >
            admin credential
          </button>
        )}
        {mCredential ? (
          <div>
            <p className="flex items-center">
              <span>Email : moderator@gmail.com</span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() =>
                  handleCopy("moderator@gmail.com", setModEmailCopied)
                }
              >
                {modEmailCopied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy />
                )}
              </span>
            </p>
            <p className="flex items-center">
              <span>Password : moderatororg</span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() => handleCopy("moderatororg", setModPasswordCopied)}
              >
                {modPasswordCopied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy />
                )}
              </span>
            </p>
          </div>
        ) : (
          <button
            onClick={() => setMCredential(true)}
            className="border-2 border-black px-10 py-2.5 rounded-full font-bold"
          >
            moderator credential
          </button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
