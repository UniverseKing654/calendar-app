import React from 'react';
import './Table.css'
function Table({ table }) {

  return (
    <div className="table-container">
      <table id="table-global-component">
        <tbody>
          {table.map((fila, rowIndex) => (
            <tr key={rowIndex}>
              {fila.map((valor, colIndex) => (
                <td id="table-global-component-data" key={colIndex}>
                  <input
                    type="text"
                    value={valor}
                    readOnly
                  />
                </td>
              ))}
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
