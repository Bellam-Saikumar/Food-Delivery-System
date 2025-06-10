import React from 'react';
import './SearchDropdown.css';

function SearchDropdown({ results }) {
  return (
    <div className="search-dropdown">
      {results.map((item) => (
        <div key={item._id} className="search-item">
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default SearchDropdown;
