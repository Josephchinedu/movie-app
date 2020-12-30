import React, {useEffect, useState} from 'react';

import './App.css';
import Movie from './component/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/movie/popular?api_key=b488f12a48a3501dbd0295335dbd4764&language=en-US&page=1";
const IMG_API= "https://image.tmdb.org/t/p/w1300";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=b488f12a48a3501dbd0295335dbd4764&query=";

const App = () => {
const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(async() => {
  fetch(FEATURED_API).then((res) => res.json())
        .then(data => {
          console.log(data);
          setMovies(data.results);
        })
  

  
}, []);

const handleonSubmit = (e) =>{
  e.preventDefault();


  if(searchTerm){
      fetch(SEARCH_API+searchTerm).then((res) => res.json())
        .then(data => {
          console.log(data);
          setMovies(data.results);
      })

      setSearchTerm('');
  }
};

const handleonChange = (e) => {
  setSearchTerm(e.target.value);
}



  return (
<>
    <header>
      <form onSubmit={handleonSubmit}>
        <input className="search" type="search" placeholder="search...." value={searchTerm} onChange={handleonChange} />
      </form>
    </header>
    <div className="App">
      {movies.length > 0 && movies.map(movie => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  </>
  );
}

export default App;
