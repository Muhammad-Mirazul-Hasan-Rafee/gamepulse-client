import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatedGames = () => {
  const updateReviewedGame = useLoaderData();
  const { _id, gameTitle } = updateReviewedGame;

      const handleUpdate = (e) => {
        e.preventDefault();
    
        const form = e.target;
       // const gameTitle = form.gametitle.value;
        const reviewDescription = form.reviewdescription.value;
       // const name = form.name.value;
       // const email = form.email.value;
       // const rating = form.rating.value;
        //const publishingYear = form.publishingyear.value;
        const thumbnail = form.thumbnail.value;
        //const genres = form.genres.value;
    
        const updateGame = {
          gameTitle,
          reviewDescription,
          thumbnail,
        };
    
        console.log(updateGame);
    
        // Sending data to the server
        fetch(`http://localhost:8000/game/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateGame),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
    
            if (data.modifiedCount>0) {
          form.reset();
          
              Swal.fire({
                title: "Hurrah!",
                text: "Review updated successfully!",
                imageUrl: thumbnail,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: gameTitle,
                 
              });
            }
          });
      };







  return (
    <div>
      <h2> Update Review for: {gameTitle}</h2>
      <form onSubmit={handleUpdate}>
        <div className="sm:grid grid-cols-1 md:flex gap-x-1">
                    <section>
            <label htmlFor="thumbnail" className="block mb-1 font-medium">
              Thumbnail:
            </label>
            <input
              type="text"
              placeholder="thumbnail url"
              name="thumbnail"
              className="input input-primary w-[300px] text-gray-400"
            />
          </section>
                  <section>
            <label
              htmlFor="reviewDescription"
              className="block mb-1 font-medium"
            >
              Review Description:
            </label>
            <input
              type="text"
              placeholder="review description"
              name="reviewdescription"
              className="input input-primary w-[300px] text-gray-400"
            />
          </section>
        </div>
        {/* UPDATE BTN */}
        <div className="sm:grid grid-cols-1 md:flex justify-end w-[650px]">
          <button className="btn btn-primary btn-outline w-[100px] active:!bg-[#FFF] active:!text-black">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedGames;
