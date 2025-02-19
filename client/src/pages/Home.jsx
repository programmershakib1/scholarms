import About from "../components/About";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import OurSuccess from "../components/OurSeccess";
import OurSuccessClient from "../components/OurSuccessClient";
import ScholarshipReviews from "../components/ScholarshipReviews";
import SpecialScholarship from "../components/SpecialScholarship";
import TopScholarships from "../components/TopScholarships";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <TopScholarships></TopScholarships>
      <OurSuccessClient></OurSuccessClient>
      <SpecialScholarship></SpecialScholarship>
      <OurSuccess></OurSuccess>
      <ScholarshipReviews></ScholarshipReviews>
      <Faq></Faq>
      <Contact></Contact>
    </div>
  );
};

export default Home;
