import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainConatiner = () => {
  const movies = useSelector((state) => state.movie?.nowPlayingMovies);
  if (!movies) return;
  const mainMovies = movies[0];
  const { original_title, overview, id } = mainMovies;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainConatiner;
