import React from "react";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const navigate = useNavigate();
  
  const handlePlayClick = () => {
    navigate(`/watch/${movieId}`);
  };

  return (
    <div className="w-full aspect-video pt-[15%] sm:pt-[18%] md:pt-[20%] px-4 sm:px-12 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden sm:block py-2 md:py-6 text-sm md:text-lg w-full sm:w-3/4 md:w-1/2 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">{overview}</p>
      <div className="flex mt-2 sm:mt-4">
        <button 
          className="bg-white text-black py-1 px-3 sm:py-2 sm:px-6 md:p-4 md:px-12 rounded-lg text-sm sm:text-base md:text-xl hover:opacity-80 flex items-center"
          onClick={handlePlayClick}
        >
          <svg className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Play
        </button>
        <button className="mx-2 bg-gray-400 text-white py-1 px-2 sm:py-2 sm:px-4 md:p-4 md:px-8 rounded-lg text-sm sm:text-base md:text-xl bg-opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
