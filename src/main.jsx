
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
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
      //   loader:({params})=> fetch(`https://chill-gamer-server1-r58yveu40-hasan-rafees-projects.vercel.app/game/${params.id}`)
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
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
     
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
