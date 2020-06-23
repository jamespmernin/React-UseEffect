import React, { useState } from "react";

function Form(props) {
  const [movieTitle, setMovieTitle] = useState("");
  //console.log("Form - movieTitle", movieTitle);
  const handleSubmit = (e) => {
    //console.log('handleSubmit clicked')
    e.preventDefault();
    props.handleSubmit(movieTitle);
    setMovieTitle("");
  };

  const handleChange = (e) => {
    //console.log('handleChange clicked - value', e.target.value);
    const title = e.target.value;
    setMovieTitle(title);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movieTitle">Title</label>
        <input
          id="movieTitle"
          type="text"
          value={movieTitle}
          onChange={handleChange}
        />
        <input type="submit" value="Find Movie Info" />
      </form>
    </>
  );
}

export default Form;
