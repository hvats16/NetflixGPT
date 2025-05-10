import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryConatiner = () => {
  const movies = useSelector((state) => state?.movie);
  if (!movies) return null;
  
  return (
    <div className="bg-black px-2 sm:px-4 md:px-8 lg:px-12">
      <div className="-mt-16 sm:-mt-32 md:-mt-52 relative z-20 pb-4 sm:pb-6 md:pb-8">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryConatiner;
