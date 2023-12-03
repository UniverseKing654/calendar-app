import React from 'react';

function ArrayDisplay({ array }) {
  return (
    <div>
      {array.map((parameter, index) => (
        <div key={index}>- {parameter}</div>
      ))}
    </div>
  );
}

export default ArrayDisplay;