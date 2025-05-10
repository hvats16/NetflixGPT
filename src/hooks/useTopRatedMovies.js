import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  
  const getTopRatedMovies = async () => {
    try {
      // Fetch first 3 pages to get more movies
      const allMovies = [];
      
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        
        if (data.results) {
          allMovies.push(...data.results);
        }
      }
      
      // Dispatch all fetched movies
      dispatch(addTopRatedMovies(allMovies));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };
  
  useEffect(() => {
    getTopRatedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedMovies;
