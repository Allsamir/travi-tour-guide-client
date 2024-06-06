import React from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import useRole from "./hooks/useRole";

const Dashboard: React.FC = () => {
  const { role } = useRole();
  const location = useLocation();
  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-secondaryColor py-6">
            <div className="flex-1">
              <a className="text-xl">
                <img
                  src="http://quickdevs.com/demo/travi/images/logos/logo.png"
                  alt=""
                  className="w-52"
                />
              </a>
            </div>
            <div className="flex-none">
              <label
                htmlFor="my-drawer-4"
                className="btn btn-circle swap swap-rotate bg-primaryColor text-secondaryColor"
              >
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </div>
          </div>
          {location.pathname === "/dashboard" && <Navigate to={`/`}></Navigate>}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-8 w-80 min-h-full bg-secondaryColor text-primaryColor bg-opacity-45 gap-6">
            {role?.role === "admin" ? (
              <>
                <li>
                  <NavLink to={`/dashboard/admin-profile`}>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/add-packages`}>Add Packages</NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/manage-packages`}>
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/post-blogs`}>Post Blogs</NavLink>
                </li>
              </>
            ) : role?.role === "guide" ? (
              <>
                <li>
                  <NavLink to={`/dashboard/guide-profile`}>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/my-assigned-tourists`}>
                    My Assigned Tourists
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={`/dashboard/user-profile`}>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/update-profile`}>
                    Update Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/my-bookings`}>My Bookings</NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/my-wishlist`}>My WishList</NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/request-admin`}>
                    Request Admin
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/blogs`}>Blogs</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
