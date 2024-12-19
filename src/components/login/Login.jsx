import React, { useContext } from "react";
import { motion } from "framer-motion";
import "./login.css";
import SignUp from "./Signup";
import SignIn from "./Signin";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { isSignin } = useContext(AuthContext);

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -1 },
  };

  return (
    <section className="container d-md-flex align-items-start justify-content-center px-5 px-md-0 gap-4   ">
      <div className="auth-container overflow-hidden   col col-md-6 mx-auto  ">
        <motion.div
          key={isSignin ? "signin" : "createAccount"}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: "0.5" }}
        >
          {isSignin ? <SignIn /> : <SignUp />}
        </motion.div>
      </div>
      <div className="aside-container d-none d-md-block col-md-6  my-4 ps-2  ">
        <small className="">About</small>
        <h1>Evangadi Networks</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Wheather you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <button className="btn btn-warning">CREATE A NEW ACCOUNT</button>
      </div>
    </section>
  );
}

export default Login;
