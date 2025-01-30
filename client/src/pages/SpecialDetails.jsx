import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet-async";

const SpecialDetails = () => {
  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>Exclusive Scholarships - ScholarMS</title>
      </Helmet>
      <div className="shadow-md p-5 rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="lg:w-1/2">
            <img
              className="w-full h-52 md:h-80 lg:h-96 rounded-xl"
              src="https://i.ibb.co.com/26sFG8X/64d39070-8596-11ef-addc-5556603eb4c1.jpg"
              alt=""
            />
          </div>
          <div className="lg:w-1/2">
            <div>
              <img className="w-20" src={logo} alt="" />
            </div>
            <h2 className="text-3xl font-black mt-3 mb-3">
              Exclusive Special Scholarship!
            </h2>
            <p>
              The Dream Big Scholarship 2025 is a remarkable opportunity for
              students worldwide to achieve their academic aspirations. This
              scholarship is designed for dedicated learners who are ready to
              take the next step in their educational journey. Exclusively
              available to registered users of our platform, this special
              scholarship comes with no application fees—just sign up and submit
              your application for free! Whether you&apos;re pursuing higher
              education or specialized training, this scholarship provides a
              helping hand to unlock your full potential. The Dream Big
              Scholarship 2025 reflects our commitment to fostering talent and
              ensuring that financial constraints don’t stand in the way of
              achieving greatness.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Global Accessibility :</strong> Open to students from
              every corner of the world.
            </li>
            <li>
              <strong>No Application Fees :</strong> 100% free to apply—just
              register on our platform.
            </li>
            <li>
              <strong>Generous Benefit :</strong> Receive $5,000 toward your
              tuition fees, giving you the financial flexibility to focus on
              your studies.
            </li>
            <li>
              <strong>Easy Application Process :</strong> Seamlessly apply
              through our user-friendly platform with minimal effort.
            </li>
            <li>
              <strong>Exclusive Opportunity :</strong> Available only to our
              platform users, ensuring better chances for our community members.
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-3">
            Why Apply for the Dream Big Scholarship 2025?
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Eliminate financial hurdles on your academic journey.</li>
            <li>Stand out with an achievement that boosts your resume.</li>
            <li>
              Join a community of like-minded individuals dedicated to learning
              and growth.
            </li>
            <li>
              Invest in your future without worrying about application costs.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-lg font-semibold">
            <strong>Deadline:</strong> March 15, 2025
          </p>
          <p className="text-lg font-semibold">
            <strong>Benefit:</strong> $5,000 toward your tuition fees
          </p>
          <p className="mt-4">
            Don’t let this incredible opportunity slip away. Register today, and
            take the first step toward turning your dreams into reality!
          </p>
        </div>
        <Link to={"/specialForm"}>
          <button className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-md">
            Apply Scholarship
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SpecialDetails;
