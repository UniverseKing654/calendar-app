import React, { useState } from 'react';

function DateBar({onSearch}) {
  const [date, setDate] = useState('');

  const handleInputChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    inputValue = inputValue.replace(/(\d{2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');

    inputValue = inputValue.slice(0, 10);

    setDate(inputValue);
    if (inputValue.length === 10) {
        handleDateComplete(inputValue);
      }
  };

  const handleDateComplete = (completeDate) => {
        setQuery(completeDate);
        onSearch(completeDate);
  };

  const DateBarStyle = {
    width: '200px', 
    height: '20px',
    padding: '8px', 
    fontSize: '14px',  
  };
  return (
    <div>
        <label>Ingrese la fecha del evento: </label>
        <input
            type="text"
            placeholder="DD/MM/AAAA"
            value={date}
            onChange={handleInputChange}
            maxLength={10}
            style={DateBarStyle}
        />
    </div>
  );
}

export default DateBar;