import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form'
import MovieInfo from './components/MovieInfo'

function App() {

  const [movieData, setMoviedata] = useState({})
  const [movieTitle, setMovieTitle] = useState('star trek')

  // useEffect with ,[] is componentDidMount
  // componentDidMount runs only once when the component is mounted
  useEffect( () => {
    console.log('inside useEffect - componentDidMount')
    const movieUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=98e3fb1f`;
    const makeApiCall = async () => {
      const res = await fetch(movieUrl)
      const json = await res.json()
      setMoviedata(json)
    }
    makeApiCall()
  },[])

  // useEffect without ,[] is componentDidUpdate
  // componentDidUpdate runs everytime the component rerenders
  useEffect( () => {
    console.log('inside useEffect - componentDidUpdate')
    const movieUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=98e3fb1f`;
    const makeApiCall = async () => {
      const res = await fetch(movieUrl)
      const json = await res.json()
      setMoviedata(json)
    }
    makeApiCall()
  }, [movieTitle])

  // Refactor handleSubmit for async/await
  // allows us to run our code in a synchronous fashion
  const handleSubmit = async title => {
     setMovieTitle(title)
  }


// https://api.giphy.com/v1/gifs/random?api_key=W9ThL38OlmMnIif0P13v036495Y4OMVA

  // const handleSubmit = title => {
  //   // console.log('handleSubmit - title', title)
  //   // were using string template literals to add the title within the string
  //   let movieUrl = `https://www.omdbapi.com/?t=${title}&apikey=98e3fb1f`;
  //   // fetch returns a Promise
  //   fetch(movieUrl)
  //    // .then() will handle the Promise once its resolved
  //    //  res.json() parse  the returned data from string to object
  //    //  it parses it under the hood using JSON.parse()
  //    .then( response => response.json())
  //    // .then() will now have access to the data
  //    .then( data => setMoviedata(data))
  // }

  return (
    
    <div className="App">
     <h1>OMDB Movie App</h1>
     <Form handleSubmit={handleSubmit}/>
     {/* condition        true                          false */}
     {movieData.Title ? <MovieInfo movie={movieData}/> : null }
    </div>
  );
}

export default App;
