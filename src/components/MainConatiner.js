import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainConatiner = () => {
  const movies = useSelector((state) => state.movie?.nowPlayingMovies);
  if (!movies) return null;
  
  const mainMovies = movies[0];
  const { original_title, overview, id } = mainMovies;
  
  return (
    <div className="relative pt-[40%] sm:pt-[30%] md:pt-0 bg-black">
      <VideoTitle title={original_title} overview={overview} movieId={id} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainConatiner;
