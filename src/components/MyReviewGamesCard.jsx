import {  useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import Swal from "sweetalert2";

const MyReviewGamesCard = ({ reviewedGame, games, setGames }) => {
  const {_id} = reviewedGame;
  const [showModal, setShowModal] = useState(false);

   // get current state from games array
  const game = games.find(g => g._id === _id);

  const [title , setTitle] = useState(reviewedGame.gameTitle);
  const [reViewDes , setDes] = useState(reviewedGame.reviewDescription);
  const [thumb , setThumb] = useState(reviewedGame.thumbnail);

  // ---------------------------------------------------------------------------------------
  // .............................Update handler............................................
  // ---------------------------------------------------------------------------------------
  const handleUpdate = (e) => {
    e.preventDefault();

    // const form = e.target;
    // const updatedTitle = form.gametitle.value;
    // const updatedDescription = form.reviewdescription.value;
    // const updatedThumb = form.thumbnail.value;

    const updateGame = {
      gameTitle: title,
      reviewDescription: reViewDes,
      thumbnail: thumb,
    };

    // .....................  Sending to server  ..................................
    fetch(`http://localhost:8000/game/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateGame),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Hurrah!",
            text: "Review updated successfully!",
            imageUrl: reviewedGame.thumbnail,
            imageWidth: 400,
            imageHeight: 200,
          });

          // updating card state without reload
          const remainingUpdate = games.map((update) =>
            update._id === _id ? { ...update, gameTitle: title , reviewDescription: reViewDes , thumbnail:thumb} : update
          );
          setGames(remainingUpdate);

          // modal closes
          setShowModal(false);
        }
      });
  };

  // --------------------- Delete handler ---------------------
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/game/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = games.filter((g) => g._id !== _id);
              setGames(remaining);

              Swal.fire("Deleted!", "Your review has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      {/* ------- Game Card----- */}
      <div className="sm:w-full h-auto md:w-[480px] md:h-[450px] bg-base-100 shadow-md rounded-xl p-4 mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <img
            src={reviewedGame.thumbnail}
            alt={reviewedGame.gameTitle}
            className="w-24 sm:w-1/3 h-32 object-cover rounded-lg"
          />

          <div className="flex justify-end gap-4 sm:w-1/3">
            {/*  modal toggle */}
            <button
              onClick={() => setShowModal(true)}
              className="h-6 text-xl p-2 bg-gray-800 text-yellow-300 rounded-lg hover:scale-110 transition"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDelete(_id)}
              className="h-6 text-xl p-2 bg-red-700 text-white rounded-lg hover:scale-110 transition"
            >
              <FcDeleteRow />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm sm:text-base">
          <aside className="flex justify-between">
            <h2 className="text-2xl font-bold text-yellow-400">{reviewedGame.gameTitle}</h2>
            <p className="font-bold text-lg">
              Rating: <span className="text-amber-400">{reviewedGame.rating}</span>
            </p>
          </aside>

          <p className="text-gray-300 text-sm leading-relaxed">
            {reviewedGame.reviewDescription}
          </p>
        </div>
      </div>

      {/* Modal for update */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[500px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Update Review for: {reviewedGame.gameTitle}
            </h2>

            <form onSubmit={handleUpdate}>
              <label>Game Title:</label>
              <input
                type="text"
                name="gametitle"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
                className="w-full p-2 mb-3 bg-black border border-white"
                required
              />

              <label>Description:</label>
              <input
                type="text"
                name="reviewdescription"
                value={reViewDes}
                onChange={(e)=>setDes(e.target.value)}
                className="w-full p-2 mb-3 bg-black border border-white"
                required
              />

              <label>Thumbnail URL:</label>
              <input
                type="text"
                name="thumbnail"
                value={thumb}
                onChange={(e)=>setThumb(e.target.value)}
            
                className="w-full p-2 mb-4 bg-black border border-white"
                required
              />

              <div className="flex justify-end gap-4">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-bold"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyReviewGamesCard;


