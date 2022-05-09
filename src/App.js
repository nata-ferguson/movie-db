import './App.css';
import {useState, useEffect} from 'react'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=231f0625';

// const movie1 = {
//   "Title": "Italian Spiderman",
//   "Year": "2007",
//   "imdbID": "tt2705436",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
// }

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  function searchMovies(title) {
    fetch(`${API_URL}&s=${title}`)
      .then(res => res.json())
      .then(data => setMovies(data.Search))
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
    <div className="App">
      <h1>MovieDB</h1>

      <div className='search'>
        <input 
          placeholder="search for movie titles" 
          value={searchTerm}
          onChange={ (e) => {setSearchTerm(e.target.value)} }/>
          <img 
            src={SearchIcon} 
            alt="search"
            onClick={ () => {searchMovies(searchTerm)} }
          />
      </div>

      { movies?.length > 0
        ? (
          <div className="container">
            {movies.map( (movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        )  : 
        (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        ) }

      

    </div>
  );
}

export default App;

