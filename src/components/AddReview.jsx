import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
     console.log("Logged-in User:", user);

    const form = e.target;
    const gameTitle = form.gametitle.value;
    const reviewDescription = form.reviewdescription.value;
    const name = form.name.value;
    const email = user.email;
    const rating = form.rating.value;
    const publishingYear = form.publishingyear.value;
    const thumbnail = form.thumbnail.value;
    const genres = form.genres.value;

    const newGame = {
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      userEmail: user?.email,
      uid: user?.uid,
      gameTitle,
      reviewDescription,
      name,
      email,
      rating,
      publishingYear,
      thumbnail,
      genres,
    };

    console.log(newGame);

    // Sending data to the server
    fetch("https://chill-gamer-userserver.vercel.app/game", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newGame),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          Swal.fire({
            title: "Hurrah!",
            text: "Review inserted successfully!",
            imageUrl: thumbnail,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: gameTitle,
          });
        }
       
      });
  };
  return (
    <div className="flex justify-center">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col justify-evenly">
        <h2 className="text-3xl text-center">Insert your favourite game</h2>
        {/*................... Game Title Field + Review Description Field ....................*/}
        <div className="flex gap-x-6">
          <section>
            <label htmlFor="title" className="block mb-1 font-medium">
              Game Title:
            </label>
            <input
              type="text"
              placeholder="game title"
              name="gametitle"
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

        {/* Name field + email field */}
        <div className="flex gap-x-6">
          <section>
            <label htmlFor="name" className="block mb-1 font-medium">
              Your Name:
            </label>
            <input
              type="text"
              placeholder="your name"
              name="name"
              className="input input-primary w-[300px] text-gray-400"
            />
          </section>

          <section>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-primary w-[300px] text-gray-400"
            />
          </section>
        </div>
        {/* Rating + publishing year */}
        <div className="flex gap-x-6">
          <section>
            <label htmlFor="rating" className="block mb-1 font-medium">
              Rating:
            </label>
            <style>{`
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  `}</style>

            <input
              type="number"
              placeholder="rating"
              name="rating"
              className="input input-primary w-[300px] text-gray-400"
            />
          </section>

          <section>
            <label htmlFor="publishing-year" className="block mb-1 font-medium">
              Publishing Year:
            </label>
            <input
              type="number"
              placeholder="publishing year"
              name="publishingyear"
              className="input input-primary w-[300px] text-gray-400"
            />
          </section>
        </div>
        {/* Thumbnail + Genres */}
        <div className="flex gap-x-6">
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
            <label htmlFor="genres" className="block mb-1 font-medium">
              Genres:
            </label>
            <select
              name="genres"
              defaultValue=""
              className="input input-primary w-[300px] text-gray-400"
            >
              <option value="action">Action</option>
              <option value="rpg">RPG</option>
              <option value="adventure">Adventure</option>
            </select>
          </section>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end w-[650px]">
          <button className="btn btn-primary btn-outline w-[100px] active:!bg-[#FFF] active:!text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
