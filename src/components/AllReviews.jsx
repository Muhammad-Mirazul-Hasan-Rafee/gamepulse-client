import React, { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { useReviews } from "./CustomHooks/useReviews";
import { useQueryClient } from "@tanstack/react-query";

const AllReviews = () => {
  const { user } = useContext(AuthContext);
 // const [reviews, setReviews] = useState([]); //keep all reviews that will be fetched from backend
  const [expand, setExpand] = useState({}); // tracking see more or see less
  const [totalLikes, setTotalLikes] = useState({}); //tracking total likes for a specific review
  const [userLikes, setUserLikes] = useState({}); // current user liked a specific review or not
const queryClient = useQueryClient();


  // Fetching reviews through React Query
  const {data: reviews =[] , isLoading , error} = useReviews();


  useEffect(() => {
      if(!reviews || reviews.length === 0){
        setTotalLikes({});
      setUserLikes({});
      return;
      };


    // initiazing like counting and user likes    
        const initalLikes = {}; //storing total likes
        const initalUserLikes = {}; // storing user liked or not

        // looping every review
        reviews.forEach((review) => {
          initalLikes[review._id] = review.totalLikes || 0;

          // checking if current user already liked the current review
          initalUserLikes[review._id] =
            user && Array.isArray(review.likedBy) ? review.likedBy.includes(user.uid) : false;
        });
        setTotalLikes(initalLikes);
        setUserLikes(initalUserLikes);
      },
  [reviews , user]);


  // Expand or collapse text
  const toggleExpand = (id) => {
    setExpand((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  // handle like
  const toggleLike = (id) => {
    if (!user) {
      Swal.fire("Error!", "You must be logged in to like a review", "error");
      return;
    }

    const previousLiked = userLikes[id]; // if already liked
    const newLike = !previousLiked; // new state
    const previousCount = totalLikes[id] ?? 0;

    // instant ui update
    setUserLikes((previous) => ({ ...previous, [id]: newLike }));

    setTotalLikes((previous) => ({
      ...previous,
      [id]: newLike ? previousCount + 1 :  Math.max(0 , previousCount - 1),
    }));

    // Update likedBy array of backend  for this(current) review
    fetch(`https://chill-gamer-server-fawn.vercel.app/game/${id}/like`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ uid: user.uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //set as final which comes from backend
        setTotalLikes((previous) => ({ ...previous, [id]: data.totalLikes }));

        queryClient.invalidateQueries(['reviews']);
      })
      .catch((error) => {
        console.log(error);
        // Backend fail → rollback both states
        setUserLikes((previous) => ({ ...previous, [id]: previousLiked }));
        setTotalLikes((previous) => ({ ...previous, [id]: previousCount }));
      });
  };
// Handle loading state
  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews!</p>;
  return (
    <div>
      <h2 className="text-sm md:text-2xl">Explore what's on others mind!</h2>
      <br />

      {reviews.map((review) => (
        <main key={review._id} className="grid grid-cols-1 md:flex justify-center">
          <div
            
            className="w-fit grid grid-cols-1 justify-center items-center  bg-slate-900 "
          >
            {/* Name . photo */}
            <div className="sm:w-auto text-xs mx-auto sm:grid sm:grid-cols-2 md:w-[660px] md:text-lg md:flex justify-start items-center">
              <img
                src={review.userPhoto}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover"
                alt={review.userName}
              />
              <p>{review.userName}</p>
            </div>

            {/* Review text */}
            <div className="sm:w-auto mx-auto md:w-[600px]">
              <article className="text-sm sm:text-xs md:text-lg mx-auto">
                {expand[review._id]
                  ? review.reviewDescription
                  : `${review.reviewDescription.slice(0, 120)}...`}
              </article>

          
              {/* see more or see like */}
              <button
                onClick={() => toggleExpand(review._id)}
                className="text-white text-xs mb-2 cursor-pointer"
              >
                {expand[review._id] ? "See less" : "See more"}
              </button>
            </div>
            {/* Like section */}
            <section className="sm:w-auto mx-auto text-xs md:w-[600px] md:text-lg flex justify-between gap-1">
              <div className="flex gap-x-2">
                <button
                  onClick={() => {
                    toggleLike(review._id);
                  }}
                  className="text-red-800 text-[16px] sm:text-[17px] md:text-lg cursor-pointer"
                >
                  {userLikes[review._id] ? "❤️" : "🤍"}
                </button>
                <p className="text-xs flex items-center">
                  {totalLikes[review._id]}
                </p>
              </div>
              <p className="text-yellow-600">Ratings: <span className="text-white">{review.rating}</span></p>
            </section>
          </div>
        </main>
      ))}
    </div>
  );
};

export default AllReviews;
