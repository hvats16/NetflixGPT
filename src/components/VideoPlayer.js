import React, { useEffect, useState, useCallback } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { movieId } = useParams();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();

  const getMovieVideos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      
      // Find trailer, teaser or clip
      const filteredVideos = json.results.filter(
        (video) => 
          video.type === "Trailer" || 
          video.type === "Teaser" || 
          video.type === "Clip"
      );
      
      const videoKey = filteredVideos.length > 0 
        ? filteredVideos[0].key 
        : json.results[0]?.key;
        
      setVideoKey(videoKey);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  const getMovieDetails = useCallback(async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      setMovieDetails(json);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [movieId]);

  useEffect(() => {
    getMovieVideos();
    getMovieDetails();
    
    // Add event listener for escape key
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        navigate('/browse');
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [getMovieVideos, getMovieDetails, navigate]);

  const handleGoBack = () => {
    navigate('/browse');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top navigation bar */}
      <div className="w-full h-16 bg-black bg-opacity-80 flex items-center px-4 md:px-8">
        <button
          onClick={handleGoBack}
          className="text-white flex items-center hover:text-red-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-lg">Back to Browse</span>
        </button>
      </div>
      
      {/* Video player */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : videoKey ? (
          <div className="w-full h-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              title="Movie Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="flex items-center justify-center text-white text-xl">
            No video available for this movie
          </div>
        )}
      </div>
      
      {/* Movie info (Netflix-style) */}
      {movieDetails && (
        <div className="w-full bg-black bg-opacity-90 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{movieDetails.title}</h1>
            <div className="flex flex-wrap gap-4 mb-4 text-white text-sm">
              <span>{new Date(movieDetails.release_date).getFullYear()}</span>
              {movieDetails.runtime > 0 && (
                <span>{Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m</span>
              )}
              <span className="border border-gray-600 px-1">{movieDetails.adult ? 'A' : 'UA'}</span>
              <div className="flex gap-2">
                {movieDetails.genres?.slice(0, 3).map(genre => (
                  <span key={genre.id} className="bg-gray-800 px-2 py-1 rounded">{genre.name}</span>
                ))}
              </div>
            </div>
            <p className="text-white text-sm md:text-base">{movieDetails.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 