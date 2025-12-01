import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import styles from "../styles";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("user signed out successfully!");
      })
      .catch((error) => {
        console.log("Sign out did not worked!", error.message);
      });
  };

  return (
    <div className={`${styles.paddingX} flex justify-between`}>
      <div className="flex items-center gap-x-2">
        <img className="w-9 h-9 rounded-full" src={Logo} alt="" />
        <strong className="text-[16px] hidden sm:block">Chill Gamer</strong>
      </div>

      <div className="flex justify-center items-center text-[16px] gap-x-2">
        {user && (
          <>
            <NavLink
              to="/addReview"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-[130px] h-10 bg-slate-800"
            >
              Add Review
            </NavLink>

            <NavLink
              to="/myreviews"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-[130px] h-10 bg-slate-800"
            >
              My Reviews
            </NavLink>

            <NavLink
              to="/gamewatchlist"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-[150px] h-10 bg-slate-800"
            >
              Game WatchList
            </NavLink>
          </>
        )}
        <NavLink
          to="/"
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-[130px] h-10 bg-slate-800"
        >
          Home
        </NavLink>

        <NavLink to="/allreviews" className="bg-slate-800 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-[130px] h-10">
          All Reviews
        </NavLink>
      </div>

      <div className="flex justify-between gap-x-2 ">
        {/* <Link
          to="/signin"
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-20 h-10 bg-slate-800"
        >
          Log In
        </Link> */}

        {user ? (
          <>
            <Link
              to={`/profile/${user?.uid}`}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-20 h-10 bg-slate-800"
            >
              Profile
            </Link>

            <Link to={`profile/${user?.uid}`}>
           
              <img
                src={user?.photoURL}
                className="w-9 h-9 rounded-full"
                alt={user?.displayName}
              />
            </Link>

            <Link
              onClick={handleSignOut}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-20 h-10 bg-slate-800"
            >
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-20 h-10 bg-slate-800"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-20 h-10 bg-slate-800"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
