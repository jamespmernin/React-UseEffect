import React, { useState } from "react";

function Form(props) {
  const [movieTitle, setMovieTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setNewSearch(movieTitle);
    setMovieTitle("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movieTitle">Title</label>
        <input
          id="movieTitle"
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input type="submit" value="Find Movie Info" />
      </form>
    </>
  );
}

export default Form;
