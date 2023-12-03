import React, { useState } from 'react';

function Dropdown({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };
  const dropdownStyle = {
    width: '130px', 
    height: '40px',
    padding: '8px', 
    fontSize: '14px', 
  };
  return (
    <select style={dropdownStyle} value={selectedOption} onChange={handleSelect}>
      <option value="" disabled hidden>aaaaaaaaaaaaaaaaa</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;





