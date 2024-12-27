import axios from 'axios';
import { Movie } from '../types/movie';

const API_KEY = '3acf6ddc'; 
const BASE_URL = 'http://www.omdbapi.com/';
const fetchMovies = async (searchQuery: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}`);
    if (response.data && response.data.Search) {
      return response.data.Search as Movie[];
    } else {
      console.error('No movies found for the query.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return [];
  }
};


export default fetchMovies;
