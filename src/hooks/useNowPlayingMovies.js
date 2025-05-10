import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  
  const getNowPlayingMovies = async () => {
    try {
      // Fetch first 3 pages to get more movies
      const allMovies = [];
      
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        
        if (data.results) {
          allMovies.push(...data.results);
        }
      }
      
      // Dispatch all fetched movies
      dispatch(addNowPlayingMovies(allMovies));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };
  
  useEffect(() => {
    getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovies;
