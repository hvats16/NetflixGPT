import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
        console.log(error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          setUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(logout());
        navigate("/");
      }
    });
    //Unsubscribe function is called when component unmounts.
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="absolute px-2 sm:px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img
        className="w-24 sm:w-32 md:w-44"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex items-center p-1 sm:p-2">
          <img className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full" src={user?.photoURL} alt="user avatar" />
          <button className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
