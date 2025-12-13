import { Canvas } from "@react-three/fiber";
import styles from "../styles";
import Games from "./Games";
import Discord from "../assets/Game/play-games-on-Discord.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Scene from "../components/Chopper/Scene";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

// form control - handle submit button
const handleSubmit = (e) => {
  e.preventDefault();
};

const Home = () => {
  return (
    <div
      className={`${styles.paddingX} mt-12 h-auto text-white`}
    >

              {/*Discord image */}
        {/* <img src={Discord} alt="" /> */}


      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2000}>
        {Games.map((game, idx) => {
          const gameImg = game.image;
          const gameTitle = game.title;

          return (
            <div key={idx} className="h-[310px] w-[400px]  p-6 rounded-lg">
              <div className="flex justify-center items-center mx-auto">
                <img
                  className="w-[330px] h-[168px] object-cover rounded-md"
                  src={gameImg}
                  alt={gameTitle}
                />
              </div>
              <div>
                <h3>{gameTitle}</h3>
                <p className="text-xs text-justify">{game.description}</p>
                <p className="text-sm mt-4">Rating: {game.Rating}</p>
              </div>
            </div>
          );
        })}
      </Carousel>
      <br />
      <br />

      <br />

      <div className="grid grid-cols-2 gap-6 items-start w-[1200px] h-[780px]">


        {/* Animation Chopper */}
        <div className="w-[680px] h-[470px] flex justify-start">
          {/* <h4 className="text-3xl text-center">Explore gaming experience</h4> */}
          <Canvas
            camera={{ position: [0, 2.6, 13], fov: 70 }}
            style={{ width: "50vw", height: "120vh" }}
          >
            {/* Ambient light =  full scene will be slightly lighten */}
            <ambientLight intensity={1.2} />

            {/* Directional light = from a little bit height */}
            <directionalLight position={[5, 10, 5]} intensity={1.5} />
            <OrbitControls
              minDistance={3}
              maxDistance={30}
              autoRotate
              autoRotateSpeed={1}
              enableZoom={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />

            {/* light from a little bit below */}
            <pointLight position={[0, -5, 5]} intensity={1.5} />

            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        <img src={Discord} className="h-auto w-auto" alt="" />

      </div>
      {/* Form  */}
        <form className="flex flex-col justify-center items-center">
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
                className="input input-primary w-[300px] text-gray-400"
              />
            </section>

            <section>
              <label
                htmlFor="publishing-year"
                className="block mb-1 font-medium"
              >
                Publishing Year:
              </label>
              <input
                type="number"
                placeholder="publishing year"
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
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-outline w-[100px] active:!bg-[#FFF] active:!text-black"
            >
              Submit
            </button>
          </div>
        </form>
    </div>
  );
};

export default Home;
