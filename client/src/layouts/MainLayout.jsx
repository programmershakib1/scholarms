import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "animate.css";
import ScrollRestoration from "../components/ScrollRestoration";
import { Helmet } from "react-helmet-async";

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>ScholarMS</title>
      </Helmet>
      <ScrollRestoration></ScrollRestoration>
      <div className="py-5 dark:py-0 dark:my-5 sticky top-0 dark:top-5 z-50 bg-white dark:rounded-full">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
