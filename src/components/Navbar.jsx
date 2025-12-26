// import { Link, NavLink } from "react-router-dom";
// import Logo from "../assets/Logo and app img/gamepulse-logo.png";
// import styles from "../styles";
// import { useContext } from "react";
// import { AuthContext } from "../Providers/AuthProvider";

// const Navbar = () => {
// const getNavLinkClass = ({ isActive }) => {
//     return `w-auto h-10 p-2 rounded-3xl transition-all duration-300 flex items-center justify-center text-white ${
//       isActive
//         ? "bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]"
//         : "bg-slate-800 hover:bg-slate-700"
//     }`;
//   };

//   const { user, signOutUser, loading } = useContext(AuthContext);
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   const handleSignOut = () => {
//     signOutUser()
//       .then(() => {
//         console.log("user signed out successfully!");
//       })
//       .catch((error) => {
//         console.log("Sign out did not worked!", error.message);
//       });
//   };

//   return (
//     <div
//       className={`fixed top-0 left-3 right-3 z-50 bg-[rgb(5,8,22)] shadow-lg ${styles.paddingX} flex justify-between  items-center`}
//     >
//       <div className="flex items-center gap-x-2">
//         <img className="w-9 h-9 rounded-full" src={Logo} alt="" />
//         <strong className="text-[16px] hidden sm:block">GamePulse</strong>
//       </div>

//       <div className="flex justify-center items-center text-[16px] gap-x-2">
//         {user && (
//           <>
//             <NavLink
//               to="/addReview"
//               className={getNavLinkClass}
//             >
//               Add Review
//             </NavLink>

//             <NavLink
//               to="/myreviews"
//               className={getNavLinkClass}
//             >
//               My Reviews
//             </NavLink>

//             <NavLink
//               to="/gamewatchlist"
//               className={getNavLinkClass}
//             >
//               Game WatchList
//             </NavLink>
//           </>
//         )}
//         <NavLink to="/" className={getNavLinkClass}>
//           Home
//         </NavLink>

//         <NavLink
//           to="/allreviews"
//           className={getNavLinkClass}
//         >
//           All Reviews
//         </NavLink>
//       </div>

//       <div className="flex justify-between gap-x-2 ">
//         {/* <Link
//           to="/signin"
//           className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[16px] w-20 h-10 bg-slate-800"
//         >
//           Log In
//         </Link> */}

//         {user ? (
//           <div className="flex justify-end items-center gap-2">
//             <Link
//               to={`/profile/${user?.uid}`}
//               className={`${getNavLinkClass({ isActive: true })} w-auto h-9 p-2 rounded-3xl bg-slate-800`}
//             >
//               Profile
//             </Link>

//             <Link to={`profile/${user?.uid}`}>
//               <img
//                 src={user?.photoURL}
//                 className="w-12 h-12 rounded-full object-cover"
//                 alt={user?.displayName}
//               />
//             </Link>

//             <Link
//               onClick={handleSignOut}
//               className={`${getNavLinkClass({ isActive: true })} w-auto h-9 p-2 rounded-3xl bg-slate-800`}
//             >
//               Log Out
//             </Link>
//           </div>
//         ) : (
//           <>
//             <Link
//               to="/signin"
//                className={`${getNavLinkClass({ isActive: true })} w-auto h-9 p-2 rounded-3xl bg-slate-800`}
//             >
//               Log In
//             </Link>

//             <Link
//               to="/signup"
//               className="w-auto h-9 p-2 rounded-3xl bg-slate-800"
//             >
//               Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo and app img/gamepulse-logo.png";
import styles from "../styles";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getNavLinkClass = ({ isActive }) => {
    return `px-3 py-2 rounded-3xl transition-all duration-300 flex items-center justify-center text-white text-sm md:text-base whitespace-nowrap ${
      isActive
        ? "bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]"
        : "bg-slate-800 hover:bg-slate-700"
    }`;
  };

  const { user, signOutUser, loading } = useContext(AuthContext);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-menu")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-[rgb(5,8,22)] shadow-lg ${styles.paddingX} flex justify-between items-center py-3`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-x-2">
        <img 
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full" 
          src={Logo} 
          alt="GamePulse Logo" 
        />
        <strong className="text-sm sm:text-base md:text-lg lg:text-xl hidden sm:block">
          GamePulse
        </strong>
      </div>

      {/* Navigation Links - Visible on Medium & Large Screens */}
      <div className="hidden md:flex justify-center items-center gap-x-1 lg:gap-x-2 xl:gap-x-3">
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>

        <NavLink to="/allreviews" className={getNavLinkClass}>
          All Reviews
        </NavLink>

        {user && (
          <>
            <NavLink to="/addReview" className={getNavLinkClass}>
              Add Review
            </NavLink>

            <NavLink to="/myreviews" className={getNavLinkClass}>
              My Reviews
            </NavLink>

            <NavLink to="/gamewatchlist" className={getNavLinkClass}>
              WatchList
            </NavLink>
          </>
        )}
      </div>

      {/* User/Auth Section */}
      <div className="flex items-center gap-x-2">
        {user ? (
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Profile Link - Hidden on Medium, Visible on Large */}
            <Link
              to={`/profile/${user?.uid}`}
              className={`hidden lg:flex ${getNavLinkClass({ isActive: true })}`}
            >
              Profile
            </Link>

            {/* User Avatar with Medium Device Support */}
            <Link to={`/profile/${user?.uid}`} className="flex items-center gap-1 md:gap-2">
              <img
                src={user?.photoURL}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-gray-700"
                alt={user?.displayName}
              />
              {/* Username - Hidden on Medium, Visible on Large */}
              <span className="hidden xl:inline text-white text-sm font-medium max-w-[100px] truncate">
                {user?.displayName?.split(" ")[0]}
              </span>
            </Link>

            {/* Logout Button with Medium Device Text */}
            <button
              onClick={handleSignOut}
              className={`${getNavLinkClass({ isActive: true })}`}
            >
              <span className="hidden md:inline">Log Out</span>
              <span className="md:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>
            </button>
          </div>
        ) : (
          <>
            {/* Mobile Login Button (Icon only) */}
            <Link
              to="/signin"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-3xl bg-slate-800 hover:bg-slate-700"
              title="Login"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>

            {/* Medium & Large Device Login/Signup Buttons */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <Link to="/signin" className={getNavLinkClass({ isActive: true })}>
                Log In
              </Link>

              <Link to="/signup" className={getNavLinkClass({ isActive: true })}>
                Sign Up
              </Link>
            </div>
          </>
        )}

        {/* Mobile Menu Button (Hamburger) - Visible only on Small Screens */}
        <button
          className="md:hidden ml-1 w-9 h-9 flex items-center justify-center rounded-3xl bg-slate-800 hover:bg-slate-700 hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
              isMobileMenuOpen 
                ? "M6 18L18 6M6 6l12 12" 
                : "M4 6h16M4 12h16M4 18h16"
            } />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed top-14 left-0 right-0 z-40 bg-[rgb(5,8,22)] shadow-lg border-t border-gray-800 p-4">
          <div className="flex flex-col space-y-2">
            <NavLink to="/" className={getNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/allreviews" className={getNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              All Reviews
            </NavLink>

            {user && (
              <>
                <NavLink to="/addReview" className={getNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  Add Review
                </NavLink>

                <NavLink to="/myreviews" className={getNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  My Reviews
                </NavLink>

                <NavLink to="/gamewatchlist" className={getNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  Game WatchList
                </NavLink>

                <Link
                  to={`/profile/${user?.uid}`}
                  className="w-full px-3 py-2 rounded-3xl bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 flex items-center justify-center text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/signin"
                  className="w-full px-3 py-2 rounded-3xl bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 flex items-center justify-center text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="w-full px-3 py-2 rounded-3xl bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 flex items-center justify-center text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;