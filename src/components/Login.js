import React from "react";
import Header from "./Header";

const Login = () => {
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
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full rounded-sm bg-[rgba(22,22,22,0.7)] border border-[rgba(255,255,255,0.5)]"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-sm bg-[rgba(22,22,22,0.7)] border border-[rgba(255,255,255,0.5)]"
        />
        <button className="p-3 my-3 bg-red-700 w-full rounded-sm font-bold">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
