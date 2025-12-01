import React from "react";
import image from "../assets/Game/Commandos_Strike.jpg";

const AllReviews = () => {
  return (
    <div>
      <h2 className="text-sm md:text-2xl">Explore what's on others mind!</h2>

      <main className="flex justify-center">
        {/* secondary main */}
        <div className="w-fit grid grid-cols-1 justify-center items-center  bg-slate-900 ">
          <div className="max-w-fit">
            {/* Image and Name */}
            <aside className="flex justify-start items-center gap-x-2 ">
              <img
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                src={image}
                alt=""
              />
              <p className="text-xs font-bold sm:text-sm  md:text-lg">Muhammad Mirazul Hasan Rafee</p>
            </aside>
          </div>
          {/* Game title + Ratings */}
          <div className="sm:w-auto text-xs mx-auto sm:grid sm:grid-cols-2 md:w-[600px] md:text-lg md:flex justify-between">
            <p>Game Title:</p>
            <img src={image} className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover" alt="" />
            <p>Ratings:</p>
          </div>
          {/* Review text */}
          <div className="sm:w-auto mx-auto md:w-[600px]">
            <article className="text-sm sm:text-xs md:text-lg text-justify">
              Articles for the game will stay here! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Deserunt, molestias debitis rem
              impedit provident facere laboriosam ullam aut quis nostrum?
            </article>
          </div>
          {/* Like section */}
          <section className="sm:w-auto mx-auto text-xs md:w-[600px] md:text-lg flex justify-start gap-1">
            <p className="text-red-800 text-[16px] sm:text-[17px] md:text-lg">❤</p>
            <p className="text-xs flex items-center">100</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AllReviews;
