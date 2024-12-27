import React, { useState, useEffect } from 'react';
import { Movie } from './types/movie';
import fetchMovies from './api/movieApi'; 
import MovieItem from './components/MovieItem'; 
import './App.css'; 
const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchData = async () => {
        try {
          const movieData = await fetchMovies(searchQuery); 
          setMovies(movieData || []); 
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      fetchData();
    } else {
      setMovies([]); 
    }
  }, [searchQuery]);

  const handleAddMovie = (movie: Movie) => {
    if (!watchList.some((item) => item.imdbID === movie.imdbID)) {
      setWatchList([...watchList, { ...movie, customRating: 0 }]);
    } else {
      alert('Movie already in watchlist!'); 
    }
  };

  const handleRemoveMovie = (id: string) => {
    setWatchList(watchList.filter((movie) => movie.imdbID !== id));
  };

  const handleUpdateRating = (id: string, rating: number) => {
    setWatchList(
      watchList.map((movie) =>
        movie.imdbID === id ? { ...movie, customRating: rating } : movie
      )
    );
  };

  return (
    <div>
      <h1>Movie Library</h1>
      <input
        type="text"
        placeholder="Search Movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieItem
              key={movie.imdbID}
              movie={movie}
              onAdd={handleAddMovie}
              onRemove={handleRemoveMovie}
              onUpdateRating={handleUpdateRating}
            />
          ))
        ) : (
          <p>No movies found. Try searching for a movie!</p> 
        )}
      </div>

      <h2>Watch List</h2>
      <div className="watch-list">
        {watchList.length > 0 ? (
          watchList.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <h3>
                {movie.Title} ({movie.Year})
              </h3>
              <img src={movie.Poster} alt={movie.Title} />
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`star ${i <= (movie.customRating || 0) ? 'filled' : ''}`}
                    onClick={() => handleUpdateRating(movie.imdbID, i)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button onClick={() => handleRemoveMovie(movie.imdbID)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your watch list is empty.</p>
        )}
      </div>
    </div>
  );
};

export default App;
