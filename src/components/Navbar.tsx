import React from "react";
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
  return (
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
        <ul className="menu menu-horizontal px-1 uppercase text-primaryColor font-semibold gap-3">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
