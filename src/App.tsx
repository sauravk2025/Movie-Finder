import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";


const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // initially there is no term in serachbar
  const [movies, setMovies] = useState([]);

  async function searchMovies(title: string) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search); // change movie varibale to title searched
  }

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies("Avengers"); //when page is rendered initially it shoudl display something for that
  }, []);

  return (
    <div className="app">
      <h1 className="btn-shine">MovieWorld</h1>
      <div className="search">
        <input
          className="enterkey"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); //e is the event object and e.target.value gives the value what we type
          }}
          onKeyDown={handleKeyPress}
          placeholder="Search for movies"
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie_element) => (
            <MovieCard movie={movie_element} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
