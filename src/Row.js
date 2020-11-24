import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import instance from "./axios";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/w500";
function Row({ title, fetchURL, isLargeRow }) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // A piece of code which run based on specific condition
  useEffect(() => {
    // if [] is blank then useEffect will only run once.
    // in this case useEffect will run when ever the fetchURL value is changes
    async function fetchData() {
      const request = await instance.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchURL]);

  const handleClick = (movie) => {
    // console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search);
          console.log(url);
          setTrailerUrl(urlParam.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            onClick={() => handleClick(movie)}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
