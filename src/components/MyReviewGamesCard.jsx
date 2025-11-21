import { FaEdit } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyReviewGamesCard = ({ reviewedGame, gameRemove, setGameRemove }) => {
  const { _id, thumbnail, gameTitle, rating, reviewDescription } = reviewedGame;

  // Delete
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/game/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const remainingReview = gameRemove.filter((gr) => gr._id !== _id);
              setGameRemove(remainingReview);
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="max-w-full w-full md:w-[600px] bg-base-100 shadow-md rounded-xl p-4 mx-auto">
      {/* Thumbnail + Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={thumbnail}
          alt={gameTitle}
          className="w-full sm:w-1/3 h-40 object-cover rounded-lg "
        />

        <div className="flex justify-end gap-4 ml-4 sm:w-1/3">
          <Link to={`/updatedgames/${_id}`} className="h-12 text-xl p-2 bg-gray-800 text-yellow-300 rounded-lg hover:scale-110 transition">
            <FaEdit />
          </Link>
          {/* id must pass korte hbe */}
          <button
            onClick={() => handleDelete(_id)}
            className="h-12 text-xl p-2 bg-red-700 text-white rounded-lg hover:scale-110 transition"
          >
            <FcDeleteRow />
          </button>
        </div>
      </div>

      {/* Text Info */}
      <div className="mt-4 space-y-2 text-sm sm:text-base">
        <h2 className="text-2xl font-bold text-yellow-400">{gameTitle}</h2>
        <p className="text-gray-300 leading-relaxed">{reviewDescription}</p>

        <p className="font-bold text-lg">
          Rating: <span className="text-amber-400">{rating}</span>
        </p>
      </div>
    </div>
  );
};

export default MyReviewGamesCard;
