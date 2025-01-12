import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom';


export default function Cryptocurrencies1() {
  const [input, setInput] = useState("");
  const [searchedCoins, setSearchedCoins] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate()

          const options = {
              headers: {
                  'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
              },
          };
  
          const coins = (value) => {
          fetch ('https://api.coinranking.com/v2/coins', options)
              .then((response) => response.json())
              .then((json) => {
                 const data = json.data.coins;
                 const filteredCoins = data.filter((coin) => {
                     return coin.name.toLowerCase().includes(value.toLowerCase());
                 });
              
                 setSearchedCoins(filteredCoins);
              });
            };

      const handleChange = (value) => {
        setInput(value);
        coins(value)
      };

      const handleFocus = () => {
        setIsDropdownVisible(true); 
      };
    
      const handleBlur = (e) => {
        setTimeout(() => {
          setIsDropdownVisible(false);
        }, 100);
      };

          const handleClick = (uuid) => {
        // Navigate to the crypto detail page
        navigate(`/crypto/${uuid}`);
      };

  return (
    <section className="search-container">
        <div className='search-title'>Explore crypto</div>
      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for a crypto"
          className="search-input"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isDropdownVisible && searchedCoins.length > 0 && ( 
        <div className={input.length > 0 ? "coin-dropdown-wrapper" : "coin-dropdown-wrapper-hidden"}>
          <div className={input.length > 0 ? "coin-dropdown" : "coin-dropdown-hidden"}>
            {searchedCoins.map((coin) => (
              <div className='coin-item searched-coin' onClick={() => handleClick(coin.uuid)} key={coin.uuid}>
                <div className='crypto-icon'>
                  <img src={coin.iconUrl} alt="crypto-icon" />
                </div>
                <div className='coin-name'>{coin.name}</div>
                <div className='coin-short-name searched-short'>{coin.symbol}</div>
              </div>
            ))}
          </div>
        </div>
        )}
        
      </div>
      
      
    </section>
  );
}
