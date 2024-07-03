import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryConatiner = () => {
  const movies = useSelector((state) => state?.movie);
  return (
    movies && (
      <div className="bg-black pl-12">
        <div className="-mt-52 relative z-20">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        </div>
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
      </div>
    )
  );
};

export default SecondaryConatiner;
