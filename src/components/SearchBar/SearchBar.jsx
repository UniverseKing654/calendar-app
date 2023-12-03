import React, { useState } from 'react';
'./SearchBar.css'
function SearchBar({ onSearch, textbar, textbotton }) {
  
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={textbar}
        value={query}
        onChange={handleInputChange}
        class={'search-bar'}
      />
      <button type="submit">{textbotton}</button>
    </form>
  );
}

export default SearchBar;