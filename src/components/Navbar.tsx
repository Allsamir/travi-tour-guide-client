import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ButtonOutline from "./ButtonOutline";
import Swal from "sweetalert2";
import { IoIosNotifications } from "react-icons/io";
import useRole from "../hooks/useRole";

const Navbar: React.FC = () => {
  const role = useRole();
  const navLinks = (
    <>
      <li>
        <NavLink to={`/`}>Home</NavLink>
      </li>
      <li>
        <NavLink to={`/community`}>Community</NavLink>
      </li>
      <li>
        <NavLink to={`/blogs`}>Blogs</NavLink>
      </li>
      <li>
        <NavLink to={`/about-us`}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={`/contact-us`}>contact us</NavLink>
      </li>
    </>
  );
  const [show, setShow] = useState(true);
  const { user, logOutUser } = useAuth();
  const logOutFunction = () => {
    logOutUser().then(() =>
      Swal.fire({
        title: "Successful",
        text: "Logout Successfully Done",
        icon: "success",
        confirmButtonText: "Close",
      }),
    );
  };
  return (
    <>
      <div className="navbar bg-secondaryColor py-6 lg:fixed lg:z-40 lg:bg-opacity-45">
        <div className="flex-1">
          <a className="text-xl">
            <img
              src="http://quickdevs.com/demo/travi/images/logos/logo.png"
              alt=""
              className="w-52"
            />
          </a>
        </div>
        <div className="flex-none hidden lg:inline-flex">
          <ul className="menu menu-horizontal px-1 uppercase text-primaryColor font-semibold gap-3 items-center">
            {navLinks}
            {user ? (
              <>
                <div className="dropdown dropdown-left">
                  <img
                    tabIndex={0}
                    role="button"
                    src={user?.photoURL || ""}
                    alt={user.displayName || ""}
                    className="w-12 rounded-full"
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[40] menu p-2 shadow bg-secondaryColor text-primaryColor rounded-box min-w-64"
                  >
                    <div className="text-center space-y-3 my-4">
                      <p>{user.displayName}</p>
                      <p className="lowercase">{user.email}</p>
                    </div>
                    <li>
                      {role?.role === "admin" ? (
                        <Link to={`/dashboard/admin-profile`}>Dashboard</Link>
                      ) : role?.role === "guide" ? (
                        <Link to={`/dashboard/guide-profile`}>Dashboard</Link>
                      ) : (
                        <Link to={`/dashboard/user-profile`}>Dashboard</Link>
                      )}
                    </li>
                    <li>
                      <Link to={``}>
                        Offer Announcements{" "}
                        <IoIosNotifications className="text-2xl" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <ButtonOutline text="Logout" afunction={logOutFunction} />
              </>
            ) : (
              <Link to={`/login`}>
                <ButtonOutline text="Login" />
              </Link>
            )}
          </ul>
        </div>
        <div className="drawer-content flex-none lg:hidden">
          {/* Page content here */}
          <label htmlFor="my-drawer" onClick={() => setShow(false)}>
            {show ? (
              <GiHamburgerMenu className="text-3xl text-primaryColor" />
            ) : (
              <RxCross1 className="text-3xl text-primaryColor" />
            )}
          </label>
        </div>
      </div>
      {/* Dreawer */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-30">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setShow(true)}
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-secondaryColor bg-opacity-45 uppercase text-primaryColor font-semibold gap-3">
            {/* Sidebar content here */}
            {navLinks}
            <div className="divider divider-info"></div>
            {user ? (
              <>
                <img
                  role="button"
                  src={user?.photoURL || ""}
                  alt={user.displayName || ""}
                  className="w-12 ml-3 rounded-full"
                />
                <ul className="">
                  <li>
                    <Link to={``}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={``}>
                      Offer Announcements{" "}
                      <IoIosNotifications className="text-2xl" />
                    </Link>
                  </li>
                </ul>
                <ButtonOutline text="Logout" afunction={logOutFunction} />
              </>
            ) : (
              <Link to={`/login`}>
                <ButtonOutline text="Login" />
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
