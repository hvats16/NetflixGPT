import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ posterPath, movieId }) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  
  if (!posterPath) return null;
  
  const handleCardClick = () => {
    navigate(`/watch/${movieId}`);
  };
  
  return (
    <div 
      className="w-28 xs:w-36 sm:w-40 md:w-48 flex-shrink-0 pr-2 sm:pr-4
                netflix-card-hover cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`relative ${isHovering ? 'shadow-xl shadow-[var(--netflix-red)]/30' : ''} rounded-md overflow-hidden transition-all duration-300`}>
        <img 
          className="rounded-md object-cover w-full transform transition-transform duration-500"
          src={IMG_CDN_URL + posterPath} 
          alt="Movie Card" 
          loading="lazy"
        />
        
        {/* Overlay with play button on hover */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/70 to-transparent
                        transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--netflix-red)] bg-opacity-90 
                          transform transition-transform duration-500 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 w-full p-2 text-white text-center text-xs font-bold animate-slideUp">
            Play Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
