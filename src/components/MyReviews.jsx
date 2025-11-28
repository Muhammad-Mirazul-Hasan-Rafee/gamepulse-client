import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MyReviewGamesCard from "./myReviewGamesCard";

const MyReviews = () => {
  const myReviewedGames = useLoaderData();
  const [games , setGames] = useState(myReviewedGames);
  return (
    <div>
      <h3 className="text-4xl text-white">My reviews:</h3>
      <div className="flex justify-evenly px-5 sm:grid-cols-1 lg:grid-cols-2 lg:gap-x-4 lg:justify-evenly">


        {games.map((reviewedGame) => (
          <MyReviewGamesCard games={games} 
          setGames={setGames}
            reviewedGame={reviewedGame}
            key={reviewedGame._id}
          ></MyReviewGamesCard>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
