import { Link, Navigate, useNavigate } from "react-router-dom";
import google from "../assets/googleIcon.png";
import github from "../assets/github.png";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useContext, useState , emailRef } from "react";


import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";

const SignIn = () => {
  const { user, signInUser , passwordRest } = useContext(AuthContext);
   const navigate = useNavigate();
    if(user){
    return <Navigate to="/" replace/>;
  }

 



  const [visiblePassword, setVisiblePassword] = useState(false);
 
  const notify = () => toast("Successfully logged in!");
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const form = e.target;

    // Sign in or log in
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate('/');
        form.reset();
        if (!result.user.emailVerified) {
          alert("Please verify your email address!");
          return;
        } 
        else {
          alert("Succuessfully logged in!");
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  // Password reset link
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide a valid email address!!");
    } else {
      passwordRest(email)
      .then(() => {
       alert("✅ Password reset link has been sent to your email!");
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 relative">
      {/* 🔆 Border animation style */}
      <style>{`
        @keyframes moveLight {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }

        .light-border {
          position: relative;
          border: 2px solid rgba(251, 191, 36, 0.4);
          border-radius: 12px;
          overflow: hidden;
        }

        .light-border::before {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(251, 191, 36, 1);
          border-radius: 50%;
          offset-path: path("M5 5 H calc(100% - 5) V calc(100% - 5) H 5 Z");
          offset-distance: 0%;
          animation: moveLight 4s linear infinite;
          filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.8));
        }
      `}</style>

      {/* 🔹 Responsive layout */}
      <div className="hero-content flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-10 px-4 text-center lg:text-left">
        {/* 🟡 RIGHT SIDE (Desktop) */}
        <div className="w-full max-w-md flex flex-col items-center lg:items-start">
          {/* 🔸 This heading will move ABOVE form in mobile */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 order-1 lg:order-none">
            Login now!
          </h1>

          {/* 🔸 This paragraph will go BELOW form in mobile */}
          <p className="text-sm lg:text-base leading-relaxed mt-6 lg:mt-0 order-3 lg:order-none">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>

        {/* 🟢 LEFT SIDE FORM */}
        <div className="light-border card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 order-2">
          <form onSubmit={handleSignIn} className="card-body">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                ref={emailRef}
                className="input input-bordered"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={visiblePassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setVisiblePassword(!visiblePassword)}
                className="btn btn-xs absolute right-2 top-12"
              >
                {visiblePassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>

              {/* Forgot + Sign Up */}
              <div className="flex justify-between items-center text-sm mt-3 flex-wrap gap-y-2">
                <a
                  onClick={() => {
                    handleForgetPassword();
                   
                  }}
                  href="#"
                  className="label-text-alt link link-hover text-[13px]"
                >
                  Forgot password?
                </a>
                <p className="text-right text-[13px]">
                  New Comer?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="form-control mt-6 flex justify-between">
              <button onClick={notify} className="btn btn-primary w-24 h-10">
                Login
              </button>
              <div className="flex items-center w-auto">
                <p>Log in with</p>
                {} <img className="w-8 h-8 rounded-full" src={google} alt="" />
                <span> ||</span>{" "}
                <img className="w-8 h-8 rounded-full" src={github} alt="" />
              </div>
            </div>
          </form>
        </div>
      </div>
     
          

    </div>
  );
};

export default SignIn;
