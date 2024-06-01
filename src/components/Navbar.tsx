import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
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
  return (
    <>
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
        <div className="flex-none hidden lg:inline-flex">
          <ul className="menu menu-horizontal px-1 uppercase text-primaryColor font-semibold gap-3">
            {navLinks}
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
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setShow(true)}
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-secondaryColor uppercase text-primaryColor font-semibold gap-3">
            {/* Sidebar content here */}
            {navLinks}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;