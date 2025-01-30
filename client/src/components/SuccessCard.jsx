import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { formatDate } from "date-fns";
import useAuth from "../hooks/useAuth";

const SuccessCard = ({ application }) => {
  const { themeColor } = useAuth();

  const { applicantName, applicantPhoto, university, completionDate } =
    application;

  return (
    <div className=" dark:bg-c dark:text-p shadow-md p-5 rounded-xl">
      <div className="flex flex-col items-center">
        <img
          className="w-20"
          src={themeColor === "light" ? logo2 : logo}
          alt=""
        />
        <img
          className="w-40 h-40 lg:w-60 lg:h-60 rounded-full object-cover"
          src={applicantPhoto}
          alt=""
        />
      </div>
      <h4 className="text-2xl font-bold mt-2">{applicantName}</h4>
      <h6 className="font-bold mt-2">University : {university}</h6>
      <h4 className="flex items-center gap-1.5 font-semibold mt-2">
        {formatDate(new Date(completionDate), "yyyy-MM-dd")}
      </h4>
    </div>
  );
};

SuccessCard.propTypes = {
  application: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default SuccessCard;
