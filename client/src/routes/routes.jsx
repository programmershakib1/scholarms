import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import Payment from "../pages/Payment";
import Dashboard from "../layouts/Dashboard";
import MyApplication from "../dashboard/MyApplication";
import MyReviews from "../dashboard/MyReviews";
import ManageScholarship from "../dashboard/ManageScholarship";
import AllReviews from "../dashboard/AllReviews";
import AllAppliedScholarship from "../dashboard/AllAppliedScholarship";
import ApplicationEdit from "../form/ApplicationEdit";
import AddScholarship from "./../dashboard/AddScholarship";
import ManageAppliedApplication from "../dashboard/ManageAppliedApplication";
import ManageReview from "../dashboard/ManageReview";
import ManageUsers from "../dashboard/ManageUsers";
import OurSuccessClient from "../components/OurSuccessClient";
import SpecialDetails from "../pages/SpecialDetails";
import SpecialForm from "../form/SpecialForm";
import SpecialScholarships from "../dashboard/SpecialScholarships";
import Profile from "../dashboard/Profile";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import AdminAndModeratorRoute from "./AdminAndModeratorRoute";
import SuccessClient from "../dashboard/SuccessClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allScholarships",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "/successfulClient",
        element: <OurSuccessClient></OurSuccessClient>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/specialDetails",
        element: (
          <PrivateRoute>
            <SpecialDetails></SpecialDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/specialForm",
        element: (
          <PrivateRoute>
            <SpecialForm></SpecialForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "myApplication",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "manageScholarship",
        element: (
          <AdminAndModeratorRoute>
            <PrivateRoute>
              <ManageScholarship></ManageScholarship>
            </PrivateRoute>
          </AdminAndModeratorRoute>
        ),
      },
      {
        path: "allReviews",
        element: (
          <ModeratorRoute>
            <PrivateRoute>
              <AllReviews></AllReviews>
            </PrivateRoute>
          </ModeratorRoute>
        ),
      },
      {
        path: "allAppliedScholarship",
        element: (
          <ModeratorRoute>
            <PrivateRoute>
              <AllAppliedScholarship></AllAppliedScholarship>
            </PrivateRoute>
          </ModeratorRoute>
        ),
      },
      {
        path: "addScholarship",
        element: (
          <AdminAndModeratorRoute>
            <PrivateRoute>
              <AddScholarship></AddScholarship>
            </PrivateRoute>
          </AdminAndModeratorRoute>
        ),
      },
      {
        path: "manageAppliedApplication",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageAppliedApplication></ManageAppliedApplication>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageReview></ManageReview>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageUsers></ManageUsers>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "applicationEdit/:id",
        element: (
          <PrivateRoute>
            <ApplicationEdit></ApplicationEdit>
          </PrivateRoute>
        ),
      },
      {
        path: "successClient",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <SuccessClient></SuccessClient>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "specialScholarships",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <SpecialScholarships></SpecialScholarships>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
