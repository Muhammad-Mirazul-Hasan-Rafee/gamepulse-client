import React from "react";
import { useLoaderData } from "react-router-dom";
import MyReviewGamesCard from "./myReviewGamesCard";

const MyReviews = () => {
  const myReviewedGames = useLoaderData();
  return (
    <div>
      <h3 className="text-4xl text-white">My reviews:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {myReviewedGames.map((reviewedGame) => (
          <MyReviewGamesCard
            reviewedGame={reviewedGame}
            key={reviewedGame._id}
          ></MyReviewGamesCard>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
