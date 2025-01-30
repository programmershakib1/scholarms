import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { themeColor } = useAuth();

  return (
    <div className="mx-5 md:mx-0 mt-20 dark:text-p">
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-10 md:w-16"
          src={themeColor === "light" ? logo2 : logo}
          alt=""
        />
        <h2 className="md:text-5xl text-3xl font-bold text-black dark:text-white  text-center font-row">
          ScholarMS
        </h2>
      </div>
      <p className="text-center mt-5 lg:mx-52">
        Your gateway to discovering a world of scholarships and seamlessly
        managing applications. Empowering students to turn their academic dreams
        into reality, one opportunity at a time. Unlock the path to success with
        ease and confidence.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 font-semibold mt-7">
        <p className="hover:underline">Privacy Policy</p>
        <p className="hover:underline">Terms of Service</p>
        <p className="hover:underline">User Guide</p>
        <p className="hover:underline">Contact Support</p>
        <p className="hover:underline">Accessibility</p>
      </div>
      <div className="flex justify-center items-center gap-8 mt-7">
        <a href="#" target="_blank">
          <i className="fa-brands fa-facebook text-3xl"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fa-brands fa-instagram text-3xl"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fa-brands fa-twitter text-3xl"></i>
        </a>
      </div>
      <div className="border border-black dark:border-white mt-5"></div>
      <p className="text-center font-medium my-8">
        © 2025 ScholarMS. All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
