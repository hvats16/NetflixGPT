import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //Vaidate the form data
    const errors = checkValidData(
      name.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(errors);
  };

  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form className="p-12 bg-[rgba(0,0,0,0.8)] absolute w-3/12 my-36 mx-auto right-0 left-0 text-white">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full rounded-sm bg-[rgba(22,22,22,0.7)] border border-[rgba(255,255,255,0.5)]"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full rounded-sm bg-[rgba(22,22,22,0.7)] border border-[rgba(255,255,255,0.5)]"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-sm bg-[rgba(22,22,22,0.7)] border border-[rgba(255,255,255,0.5)]"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-3 my-3 bg-red-700 w-full rounded-sm font-bold"
          onClick={submitHandler}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4"
          onClick={toggleSignInForm}
          style={{ cursor: "pointer" }}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already on Netflix? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
