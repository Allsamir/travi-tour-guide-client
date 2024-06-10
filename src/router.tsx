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
import MyBookings from "./UserD/MyBookings";
import MyWishList from "./UserD/MyWishList";
import RequestToAdmin from "./UserD/RequestToAdmin";
import GuideRoutes from "./private/GuideRoutes";
import MyAssignedTourist from "./GuideD/MyAssignedTourist";
import AdminRoutes from "./private/AdminRoutes";
import AddPackages from "./AdminD/AddPackages";
import ManageUsers from "./AdminD/ManageUsers";
import PostBlogs from "./AdminD/PostBlogs";
import ErrorElement from "./ErrorElement";
import UpdateProfile from "./UserD/UpdateProfile";
import Payment from "./UserD/Payment";
import PaymentCompletion from "./components/PaymentCompletion";
import BlogDetails from "./components/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
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
        path: "/blog/:id",
        element: <BlogDetails />,
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
      // user routes
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "my-wishlist",
        element: (
          <PrivateRoute>
            <MyWishList />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "request-admin",
        element: (
          <PrivateRoute>
            <RequestToAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-completion",
        element: (
          <PrivateRoute>
            <PaymentCompletion />
          </PrivateRoute>
        ),
      },
      // guides routes
      {
        path: "guide-profile",
        element: (
          <GuideRoutes>
            <Gprofile />
          </GuideRoutes>
        ),
      },
      {
        path: "my-assigned-tourists",
        element: (
          <GuideRoutes>
            <MyAssignedTourist />
          </GuideRoutes>
        ),
      },
      // admin routes
      {
        path: "admin-profile",
        element: (
          <AdminRoutes>
            <Aprofile />
          </AdminRoutes>
        ),
      },
      {
        path: "add-packages",
        element: (
          <AdminRoutes>
            <AddPackages />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "post-blogs",
        element: (
          <AdminRoutes>
            <PostBlogs />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
