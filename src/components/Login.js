import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

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

    const nameValue = name.current ? name?.current?.value : "";
    const emailValue = email.current ? email?.current?.value : "";
    const passwordValue = password.current ? password?.current?.value : "";

    // Validate the form data
    const errors = isSignInForm
      ? checkValidData(emailValue, passwordValue)
      : checkValidData(emailValue, passwordValue, nameValue);
    setErrorMessage(errors);
    if (errors) return;

    if (!isSignInForm) {
      // Sign up Logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setIsSignInForm(true);
          // Reset form fields
          if (email.current) email.current.value = "";
          if (password.current) password.current.value = "";
          if (name.current) name.current.value = "";

          updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                setUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
              console.log(error);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          setErrorMessage(errorMessage.message);
        });
    } else {
      // Sign in Logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage.message);
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  };

  const resetFormFields = () => {
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";
    if (name.current) name.current.value = "";
    setErrorMessage(null);
  };

  useEffect(() => {
    resetFormFields();
  }, [isSignInForm]);

  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src={BG_URL}
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
