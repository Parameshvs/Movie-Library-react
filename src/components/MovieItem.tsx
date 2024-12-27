import React, { useState } from 'react';
import { Movie } from '../types/movie';

interface MovieItemProps {
  movie: Movie;
  onAdd: (movie: Movie) => void;
  onRemove: (id: string) => void;
  onUpdateRating: (id: string, rating: number) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onAdd, onRemove, onUpdateRating }) => {
  const [rating, setRating] = useState<number>(0); 
  
  const handleStarClick = (newRating: number) => {
    setRating(newRating);
    onUpdateRating(movie.imdbID, newRating); 
  };

 
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? 'filled' : ''}`}
        onClick={() => handleStarClick(i)} 
      >
        ★
      </span>
    );
  }

  return (
    <div className="movie-item">
      <h3>{movie.Title} ({movie.Year})</h3>
      <img src={movie.Poster} alt={movie.Title} />
      <button onClick={() => onAdd(movie)}>Add to Watch List</button>
      <button onClick={() => onRemove(movie.imdbID)}>Remove</button>
      <div className="rating-stars">
        {stars}  
      </div>
    </div>
  );
};

export default MovieItem;
