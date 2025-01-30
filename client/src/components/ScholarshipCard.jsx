import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "date-fns";
import ReactStars from "react-rating-stars-component";
import { MdAccessTime } from "react-icons/md";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import useAuth from "../hooks/useAuth";
import { Zoom } from "react-awesome-reveal";

const ScholarshipCard = ({ scholarship }) => {
  const { themeColor } = useAuth();
  const { pathname } = useLocation();
  const {
    _id,
    scholarship_name,
    university_name,
    country,
    city,
    degree,
    application_fee,
    subject_category,
    scholarship_category,
    deadline,
    averageRating,
    image,
  } = scholarship;

  return (
    <>
      {pathname === "/" ? (
        <div className="dark:bg-c dark:text-p shadow-md p-5 rounded-xl">
          <div>
            <img
              className="w-full h-48 lg:h-60 rounded-2xl"
              src={image}
              alt=""
            />
          </div>
          <div className="flex gap-2 mt-5">
            <img
              className="w-10 h-10"
              src={themeColor === "light" ? logo2 : logo}
              alt=""
            />
            <h4 className="text-2xl font-bold">{scholarship_name}</h4>
          </div>
          <ReactStars
            count={5}
            value={parseInt(averageRating)}
            size={30}
            edit={false}
            isHalf={true}
            activeColor="#ffd700"
          ></ReactStars>
          <div className="flex justify-between items-center mt-1">
            <h4 className="font-bold">{university_name}</h4>
            <h4 className="font-bold">{degree}</h4>
          </div>
          <div className="flex justify-between items-center mt-3">
            <h4 className="font-bold">{subject_category}</h4>
            <h4 className="font-bold">{scholarship_category}</h4>
          </div>
          <div className="flex justify-between mt-3">
            <h4 className="flex items-center gap-1.5 font-semibold">
              <MdAccessTime className="text-xl" />
              <span>{formatDate(new Date(deadline), "yyyy-MM-dd")}</span>
            </h4>
            <h4 className="font-semibold">
              <i className="fa-solid fa-dollar-sign pr-0.5"></i>
              {application_fee}
            </h4>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                <i className="fa-solid fa-city"></i>
                <span>{city}</span>
              </h4>
              <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                <i className="fa-solid fa-flag"></i>
                <span>{country}</span>
              </h4>
            </div>
            <div>
              <Link to={`/details/${_id}`}>
                <button className="mt-5 bg-black text-white dark:text-p font-semibold py-2 px-6 rounded-md">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Zoom>
          <div className="dark:bg-c dark:text-p shadow-md p-5 rounded-xl">
            <div>
              <img
                className="w-full h-48 lg:h-60 rounded-2xl"
                src={image}
                alt=""
              />
            </div>
            <div className="flex gap-2 mt-5">
              <img
                className="w-10 h-10"
                src={themeColor === "light" ? logo2 : logo}
                alt=""
              />
              <h4 className="text-2xl font-bold">{scholarship_name}</h4>
            </div>
            <ReactStars
              count={5}
              value={parseInt(averageRating)}
              size={30}
              edit={false}
              isHalf={true}
              activeColor="#ffd700"
            ></ReactStars>
            <div className="flex justify-between items-center mt-1">
              <h4 className="font-bold">{university_name}</h4>
              <h4 className="font-bold">{degree}</h4>
            </div>
            <div className="flex justify-between items-center mt-3">
              <h4 className="font-bold">{subject_category}</h4>
              <h4 className="font-bold">{scholarship_category}</h4>
            </div>
            <div className="flex justify-between mt-3">
              <h4 className="flex items-center gap-1.5 font-semibold">
                <MdAccessTime className="text-xl" />
                <span>{formatDate(new Date(deadline), "yyyy-MM-dd")}</span>
              </h4>
              <h4 className="font-semibold">
                <i className="fa-solid fa-dollar-sign pr-0.5"></i>
                {application_fee}
              </h4>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                  <i className="fa-solid fa-city"></i>
                  <span>{city}</span>
                </h4>
                <h4 className="flex items-center gap-1.5 font-semibold mt-2">
                  <i className="fa-solid fa-flag"></i>
                  <span>{country}</span>
                </h4>
              </div>
              <div>
                <Link to={`/details/${_id}`}>
                  <button className="mt-5 bg-black text-white dark:text-p font-semibold py-2 px-6 rounded-md">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Zoom>
      )}
    </>
  );
};

ScholarshipCard.propTypes = {
  scholarship: PropTypes.object,
};

export default ScholarshipCard;
