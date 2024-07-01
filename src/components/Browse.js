import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainConatiner from "./MainConatiner";
import SecondaryConatiner from "./SecondaryConatiner";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainConatiner />
      <SecondaryConatiner />
    </div>
  );
};

export default Browse;
