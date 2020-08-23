import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Form from './components/Form'
import MovieInfo from './components/MovieInfo'
import './App.css';

function App() {
  const [movieData, setMovieData] = useState({})
  const [newSearch, setNewSearch] = useState('');

  // useEffect with ,[] is componentDidMount
  // componentDidMount runs only once when the component is mounted
  useEffect( () => {
    console.log('inside useEffect - componentDidMount')
    const movieUrl = `https://www.omdbapi.com/?t=star%20trek&apikey=98e3fb1f`;
    const makeApiCall = async () => {
      const resp = await axios.get(movieUrl)
      setMovieData(resp.data)
    }
    makeApiCall()
  },[])

  // useEffect without ,[] is componentDidUpdate
  // componentDidUpdate runs everytime the component rerenders
  useEffect( () => {
    console.log('inside useEffect - componentDidUpdate')
    const movieUrl = `https://www.omdbapi.com/?t=${newSearch}&apikey=98e3fb1f`;
    const makeApiCall = async () => {
      const resp = await axios.get(movieUrl)
      setMovieData(resp.data)
    }
    makeApiCall()
  }, [newSearch])

  return (
    <div className="App">
     <h1>OMDB Movie App</h1>
      <Form setNewSearch={setNewSearch} />
     {/* condition        true                          false */}
     {movieData.Title ? <MovieInfo movie={movieData}/> : null }
    </div>
  );
}

export default App;
