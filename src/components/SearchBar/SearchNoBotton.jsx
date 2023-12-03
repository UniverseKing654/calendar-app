import React, { useState } from 'react';
import './SearchBar.css';

function SearchNoBotton({ onSearch, textbar }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onSearch(inputValue);
  };
  const searchBarStyle = {
    width: '200px', 
    height: '20px',
    padding: '8px', 
    fontSize: '14px',  
  };
  return (
    <form>
      <input
        type="text"
        placeholder={textbar}
        value={query}
        onChange={handleInputChange}
        style={searchBarStyle}
      />
    </form>
  );
}

export default SearchNoBotton;