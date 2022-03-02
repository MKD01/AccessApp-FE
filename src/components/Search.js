import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";

const Search = ({ setSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchResult(searchTerm);
    setSearchTerm("");
  };

  return (
    <>
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              value={searchTerm}
              id="search"
              placeholder="Location"
              aria-describedby="basic-addon2"
              onChange={handleChange}
            ></FormControl>
            <Button type="submit" variant="secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </form>
      </div>
    </>
  );
};

export default Search;
