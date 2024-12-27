import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 


export default function Cryptocurrencies1() {
  return (
    <section className="search-container">
        <div className='search-title'>Explore crypto</div>
      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for a crypto"
          className="search-input"
        />
      </div>
    </section>
  );
}
