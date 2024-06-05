import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Blogs from "./pages/Blogs";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TourDetails from "./components/TourDetails";
import AllPackages from "./pages/AllPackages";
import GuideProfile from "./pages/GuideProfile";
import PackagesBOType from "./components/PackagesBOType";
import StoryDetails from "./components/StoryDetails";
import AllStories from "./pages/AllStories";
import Dashboard from "./Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import Profile from "./UserD/Profile";
import Gprofile from "./GuideD/Profile";
import Aprofile from "./AdminD/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/tour-details/:id",
        element: <TourDetails />,
      },
      {
        path: "/all-packages",
        element: <AllPackages />,
      },
      {
        path: "/guide-profile/:id",
        element: <GuideProfile />,
      },
      {
        path: "/tour-type/:type",
        element: <PackagesBOType />,
      },
      {
        path: "/story/:id",
        element: <StoryDetails />,
      },
      {
        path: "/all-stories",
        element: <AllStories />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "guide-profile",
        element: (
          <PrivateRoute>
            <Gprofile />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <Aprofile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
