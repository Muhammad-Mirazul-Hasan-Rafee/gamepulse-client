import React, { useContext, useEffect, useState } from "react";
import MyReviewGamesCard from "./myReviewGamesCard";
import { AuthContext } from "../Providers/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    if (!user?.uid) {
      return;
    }
      if(!user){
    return(
      <p className="text-white text-center text-xl mt-10">You must be logged in !</p>
    );
  }

    fetch(`https://chill-gamer-server-fawn.vercel.app/game?uid=${user.uid}`)
      .then((res) => res.json()) 
      .then((data) => {
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          setGames([]); // safety fallback
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setGames([]);
        setLoading(false);
      });
  }, [user]);


  if (loading){
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (games.length === 0){
    return (
      <p className="text-white text-center mt-10">You have no reviews yet.</p>
    );
  }
  return (
    <div className="px-2">
      <h3 className="text-4xl text-white">My reviews:</h3>
      <div className="sm:grid grid-cols-1 md:flex justify-center w-auto ">
        {games.map((reviewedGame) => (
          <MyReviewGamesCard
            games={games}
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
