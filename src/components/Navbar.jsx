import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo and app img/gamepulse-logo.png";
import styles from "../styles";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
const getNavLinkClass = ({ isActive }) => {
    return `w-auto h-10 p-2 rounded-3xl transition-all duration-300 flex items-center justify-center text-white ${
      isActive
        ? "bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]"
        : "bg-slate-800 hover:bg-slate-700"
    }`;
  };

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
    <div
      className={`fixed top-0 left-3 right-3 z-50 bg-[rgb(5,8,22)] shadow-lg ${styles.paddingX} flex justify-between  items-center`}
    >
      <div className="flex items-center gap-x-2">
        <img className="w-9 h-9 rounded-full" src={Logo} alt="" />
        <strong className="text-[16px] hidden sm:block">GamePulse</strong>
      </div>

      <div className="flex justify-center items-center text-[16px] gap-x-2">
        {user && (
          <>
            <NavLink
              to="/addReview"
              className={getNavLinkClass}
            >
              Add Review
            </NavLink>

            <NavLink
              to="/myreviews"
              className={getNavLinkClass}
            >
              My Reviews
            </NavLink>

            <NavLink
              to="/gamewatchlist"
              className={getNavLinkClass}
            >
              Game WatchList
            </NavLink>
          </>
        )}
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>

        <NavLink
          to="/allreviews"
          className={getNavLinkClass}
        >
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
          <div className="flex justify-end items-center gap-2">
            <Link
              to={`/profile/${user?.uid}`}
              className={`${getNavLinkClass({ isActive: true })} w-auto h-9 p-2 rounded-3xl bg-slate-800`}
            >
              Profile
            </Link>

            <Link to={`profile/${user?.uid}`}>
              <img
                src={user?.photoURL}
                className="w-12 h-12 rounded-full object-cover"
                alt={user?.displayName}
              />
            </Link>

            <Link
              onClick={handleSignOut}
              className={`${getNavLinkClass({ isActive: true })} w-auto h-9 p-2 rounded-3xl bg-slate-800`}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
               className={`${getNavLinkClass({ isActive: true })} w-auto h-9 p-2 rounded-3xl bg-slate-800`}
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="w-auto h-9 p-2 rounded-3xl bg-slate-800"
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
