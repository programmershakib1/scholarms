import { Link, NavLink, Outlet } from "react-router-dom";
import ScrollRestoration from "../components/ScrollRestoration";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../hooks/useAxiosSecure";

const Dashboard = () => {
  const { user, loading, handleSingOut, themeColor, setThemeColor } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setThemeColor(theme === "light" ? "light" : "dark");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (loading && isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto min-h-screen dark:text-p">
      <Helmet>
        <title>Dashboard - ScholarMS</title>
      </Helmet>
      <ScrollRestoration></ScrollRestoration>
      <div className="mx-5 md:mx-0 flex justify-between items-center my-3">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-14 h-14"
              src={themeColor === "light" ? logo2 : logo}
              alt=""
            />
            <h2 className="hidden md:block font-black text-2xl font-row dark:text-white">
              ScholarMS
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="dark:text-white">
            {theme === "light" ? (
              <i className="fa-solid fa-moon text-black text-4xl"></i>
            ) : (
              <i className="fa-regular fa-moon text-4xl"></i>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <div>
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={user?.photoURL}
                  alt="User"
                />
              </div>
              <button
                onClick={handleSingOut}
                className="hidden md:block bg-black text-white dark:bg-white dark:text-black font-bold
                py-2.5 px-7 rounded-full"
              >
                Sign Out
              </button>
              <button onClick={handleSingOut} className="block md:hidden">
                <i className="fa-solid fa-right-to-bracket text-4xl"></i>
              </button>
            </div>
          ) : (
            <div>
              <button
                className="hidden md:block bg-black text-white dark:bg-white dark:text-black font-bold
               py-2.5 px-7 rounded-full"
              >
                <Link to="/signIn">Sign In</Link>
              </button>
              <button className="block md:hidden">
                <Link to="/signIn">
                  <i className="fa-solid fa-user text-4xl"></i>
                </Link>
              </button>
            </div>
          )}
          <button className="lg:hidden" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars text-4xl text-black dark:text-white"></i>
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 mt-10">
        <div className="lg:col-span-2 hidden lg:block dark:bg-c">
          <div className="flex flex-col min-h-screen h-full font-semibold shadow-2xl p-1">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "bg-black text-white p-3" : "p-3"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-user"></i>
                <span>
                  {userInfo?.role === "admin" ? "Admin Profile" : "My Profile"}
                </span>
              </span>
            </NavLink>

            {userInfo?.role === "user" && (
              <>
                <NavLink
                  to="myApplication"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-bars-progress"></i>
                    <span>My Application</span>
                  </span>
                </NavLink>
                <NavLink
                  to="myReviews"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <span>My Reviews</span>
                  </span>
                </NavLink>
              </>
            )}

            {userInfo?.role === "moderator" && (
              <>
                <NavLink
                  to="manageScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-bars-progress"></i>
                    <span>Manage Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="allReviews"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <span>All Reviews</span>
                  </span>
                </NavLink>
                <NavLink
                  to="allAppliedScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-chart-simple"></i>
                    <span>All Applied Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="addScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-address-book"></i>
                    <span>Add Scholarship</span>
                  </span>
                </NavLink>
              </>
            )}

            {userInfo?.role === "admin" && (
              <>
                <NavLink
                  to="addScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-address-book"></i>
                    <span>Add Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-bars-progress"></i>
                    <span>Manage Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageAppliedApplication"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-gear"></i>
                    <span>Manage Applied Application</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageReviews"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <span>Manage Review</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageUsers"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-users"></i>
                    <span>Manage Users</span>
                  </span>
                </NavLink>
                <NavLink
                  to="successClient"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-user-graduate"></i>
                    <span>Success Client</span>
                  </span>
                </NavLink>
                <NavLink
                  to="specialScholarships"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-user"></i>
                    <span>Special Scholarship</span>
                  </span>
                </NavLink>
              </>
            )}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "bg-black text-white p-3" : "p-3"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
              </span>
            </NavLink>
          </div>
        </div>
        <div
          ref={sidebarRef}
          className={`fixed z-10 left-0 top-0 h-screen w-2/3 md:w-1/4 lg:w-1/6 bg-white text-black dark:bg-c dark:text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform`}
        >
          <div className="flex flex-col min-h-screen h-full font-semibold shadow-2xl p-1">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "bg-black text-white p-3" : "p-3"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-user"></i>
                <span>
                  {userInfo?.role === "admin" ? "Admin Profile" : "My Profile"}
                </span>
              </span>
            </NavLink>

            {userInfo?.role === "user" && (
              <>
                <NavLink
                  to="myApplication"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-bars-progress"></i>
                    <span>My Application</span>
                  </span>
                </NavLink>
                <NavLink
                  to="myReviews"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <span>My Reviews</span>
                  </span>
                </NavLink>
              </>
            )}

            {userInfo?.role === "moderator" && (
              <>
                <NavLink
                  to="manageScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-bars-progress"></i>
                    <span>Manage Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="allReviews"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <span>All Reviews</span>
                  </span>
                </NavLink>
                <NavLink
                  to="allAppliedScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-chart-simple"></i>
                    <span>All Applied Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="addScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-address-book"></i>
                    <span>Add Scholarship</span>
                  </span>
                </NavLink>
              </>
            )}

            {userInfo?.role === "admin" && (
              <>
                <NavLink
                  to="addScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-address-book"></i>
                    <span>Add Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageScholarship"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-bars-progress"></i>
                    <span>Manage Scholarship</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageAppliedApplication"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-gear"></i>
                    <span>Manage Applied Application</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageReviews"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <span>Manage Review</span>
                  </span>
                </NavLink>
                <NavLink
                  to="manageUsers"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-users"></i>
                    <span>Manage Users</span>
                  </span>
                </NavLink>
                <NavLink
                  to="successClient"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-user-graduate"></i>
                    <span>Success Client</span>
                  </span>
                </NavLink>
                <NavLink
                  to="specialScholarships"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white p-3" : "p-3"
                  }
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-user"></i>
                    <span>Special Scholarship</span>
                  </span>
                </NavLink>
              </>
            )}

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "bg-black text-white p-3" : "p-3"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
              </span>
            </NavLink>
          </div>
        </div>
        <div className="lg:col-span-10 mt-1 pb-20 lg:mx-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
