import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-primary"
              >
                Open drawer
              </label>
            </div>
          </div>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
