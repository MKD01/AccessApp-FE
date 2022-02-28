import React, { useState } from "react";

const Search = ({ setSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`submitting ${searchTerm}`); // <--------------------
    setSearchResult(searchTerm);
    setSearchTerm("");
  };

  return (
    <>
      <div className='search-form'>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={searchTerm}
              id='search'
              placeholder='Location'
              onChange={handleChange}
            ></input>
          </label>
          <button>Search</button>
        </form>
      </div>
    </>
  );
};

export default Search;
