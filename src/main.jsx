
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import AddReview from "./components/AddReview.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import MyReviews from "./components/MyReviews.jsx";
import GameWatchList from "./components/GameWatchList.jsx";
import Profile from "./components/Profile.jsx";
import AllReviews from "./components/AllReviews.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "profile/:uid",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: "addReview",
        element: <PrivateRoute><AddReview></AddReview></PrivateRoute>,
      },
      {
        path:"allreviews",
        element: <AllReviews>,</AllReviews>
      },
      {
        path: "myreviews",
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
       },
      //  {
      //   path: "updatedgames/:id",
      //   element: <PrivateRoute><UpdatedGames></UpdatedGames></PrivateRoute>,
      //   loader:({params})=> fetch(`http://localhost:8000/game/${params.id}`)
      // },

      {
        path: "gamewatchlist",
        element: <PrivateRoute><GameWatchList></GameWatchList></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
     
    </AuthProvider>
  </StrictMode>
);
