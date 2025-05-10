import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  
  const getUpcomingMovies = async () => {
    try {
      // Fetch first 3 pages to get more movies
      const allMovies = [];
      
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        
        if (data.results) {
          allMovies.push(...data.results);
        }
      }
      
      // Dispatch all fetched movies
      dispatch(addUpcomingMovies(allMovies));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };
  
  useEffect(() => {
    getUpcomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpcomingMovies;
