import Banner from "../components/Banner";
import Contact from "../components/Contact";
import OurSuccessClient from "../components/OurSuccessClient";
import SpecialScholarship from "../components/SpecialScholarship";
import TopScholarships from "../components/TopScholarships";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <OurSuccessClient></OurSuccessClient>
      <SpecialScholarship></SpecialScholarship>
      <Contact></Contact>
    </div>
  );
};

export default Home;
