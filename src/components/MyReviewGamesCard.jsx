import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import Swal from "sweetalert2";

const MyReviewGamesCard = ({ reviewedGame, games, setGames }) => {
  const { _id } = reviewedGame;
  const [showModal, setShowModal] = useState(false);
  const [expand, setExpand] = useState({});

  const [title, setTitle] = useState(reviewedGame.gameTitle);
  const [reViewDes, setDes] = useState(reviewedGame.reviewDescription);
  const [thumb, setThumb] = useState(reviewedGame.thumbnail);

  // Update expand = see more or see less

  const tapExpand = (id) => {
    setExpand((previous)=>({...previous, [id]: !previous[id]}))
  };

  // ---------------------------------------------------------------------------------------
  // .............................Update handler............................................
  // ---------------------------------------------------------------------------------------
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedGame = {
      gameTitle: title,
      reviewDescription: reViewDes,
      thumbnail: thumb,
    };

    // .....................  Sending to server  ..................................
    fetch(`http://localhost:8000/game/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedGame),
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
          const remainingUpdate = games.map((game) =>
            game._id === _id ? { ...game, ...updatedGame } : game
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
    <main
      key={reviewedGame._id}
      className="flex justify-center sm:w-auto mx-auto md:w-[600px]"
    >
      {/* ------- Game Card----- */}
      <div className="w-full p-5 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-gray-800 hover:shadow-[0_0_25px_rgba(255,215,0,0.15)] transition-all duration-300 group ">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          {/* Thumbnail */}
          <img
            src={reviewedGame.thumbnail}
            alt={reviewedGame.gameTitle}
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border border-gray-700 shadow-lg group-hover:scale-[1.03] transition"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 rounded-xl bg-gray-800 border border-gray-700 text-yellow-300 hover:bg-gray-900 hover:border-gray-600 hover:scale-110 transition-all"
            >
              <FaEdit className="text-xl" />
            </button>

            <button
              onClick={() => handleDelete(_id)}
              className="p-2 rounded-xl bg-red-800 border border-red-900 text-white hover:bg-red-700 hover:scale-110 transition-all"
            >
              <FcDeleteRow className="text-xl" />
            </button>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-4 space-y-3">
          {/* Title + Rating */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-yellow-400 tracking-wide group-hover:text-yellow-300 transition">
              {reviewedGame.gameTitle}
            </h2>

            <span className="px-3 py-1 text-sm font-semibold text-yellow-300 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
              ⭐ {reviewedGame.rating}
            </span>
          </div>

          {/* Description */}
          <article className="text-gray-300 leading-relaxed text-sm sm:text-xs md:text-lg  text-justify">
            {
              expand[reviewedGame._id] ? reviewedGame.reviewDescription : `${reviewedGame.reviewDescription.slice(0,120)}...`
            }
          </article>
          {/* see more or see like */}
          <button
            onClick={() => tapExpand(reviewedGame._id)}
            className="text-white text-xs mb-2 cursor-pointer"
          >
            {expand[reviewedGame._id] ? "See less" : "See more"}
          </button>
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
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-3 bg-black border border-white"
                required
              />

              <label>Description:</label>
              <input
                type="text"
                name="reviewdescription"
                value={reViewDes}
                onChange={(e) => setDes(e.target.value)}
                className="w-full p-2 mb-3 bg-black border border-white"
                required
              />

              <label>Thumbnail URL:</label>
              <input
                type="text"
                name="thumbnail"
                value={thumb}
                onChange={(e) => setThumb(e.target.value)}
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
    </main>
  );
};

export default MyReviewGamesCard;
