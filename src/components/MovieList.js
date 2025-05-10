import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  if (!movies || movies.length === 0) return null;
  
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      // Show left arrow if scrolled to the right
      setShowLeftArrow(scrollLeft > 0);
      // Hide right arrow if reached the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  const slideLeft = () => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - clientWidth * 0.75,
        behavior: 'smooth'
      });
    }
  };
  
  const slideRight = () => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + clientWidth * 0.75,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div 
      className="px-2 sm:px-4 md:px-6 mb-8 sm:mb-10 relative group row-expand-animation"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl py-2 sm:py-4 text-white font-semibold group-hover:text-red-600 transition-colors duration-300">{title}</h1>
      
      {/* Left arrow */}
      {showLeftArrow && (
        <button 
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                     bg-black/80 hover:bg-[var(--netflix-red)] text-white p-4 rounded-r-lg
                     shadow-lg transition-all duration-300 ease-in-out
                     ${isHovering ? 'opacity-90' : 'opacity-0'}`}
          onClick={slideLeft}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {/* Right arrow */}
      {showRightArrow && (
        <button 
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                     bg-black/80 hover:bg-[var(--netflix-red)] text-white p-4 rounded-l-lg
                     shadow-lg transition-all duration-300 ease-in-out
                     ${isHovering ? 'opacity-90' : 'opacity-0'}`}
          onClick={slideRight}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      
      {/* Slider container with row highlight effect */}
      <div 
        className={`relative ${isHovering ? 'scale-105 z-20' : 'scale-100 z-10'} transition-transform duration-500 ease-out animate-fadeIn`}
      >
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide py-4"
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE and Edge */
          }}
          onScroll={handleScroll}
        >
          <div className="flex gap-1 sm:gap-2 pl-2 animate-slideUp">
            {movies?.map((movie) => (
              <MovieCard 
                key={movie.id} 
                posterPath={movie.poster_path} 
                movieId={movie.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
