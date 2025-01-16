import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CryptoDetail() {
  const { uuid } = useParams(); // Extract the uuid from the URL
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const options = {
      headers: {
        'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
      },
    };

    // Fetch the coin details based on the uuid
    fetch(`https://api.coinranking.com/v2/coin/${uuid}`, options)
      .then((response) => response.json())
      .then((data) => setCoin(data.data.coin));
  }, [uuid]);


  console.log(coin)
  if (!coin) return <div>Loading...</div>;

  return (
    <>
      <div className='crypto-detail-page'>
        <div className='crypto-detail-left'>
          <div className='detail-coin-head'>
            <img className='detail-coin-icon' src={coin.iconUrl} alt="" />
            <div className="detail-coin-name">{coin.name}</div>
            <div className='detail-coin-shortname'>{coin.symbol}</div>
            <div className='detail-coin-rank'>#{coin.rank}</div>
          </div>
          <div>
            <button className='detail-coin-button'>add to favorites</button>
          </div>
          <div className='detail-coin-details'>
            <div>
              <div>Market Cap</div>
              <div className='detail-mrg-left'>${coin.marketCap}</div>
            </div>
            <div>
              <div>Fully Diluted Valuation</div>
              <div className='detail-mrg-left'>${coin.fullyDilutedMarketCap}</div>
            </div>
            <div>
              <div>24 Hour Trading Volume</div>
              <div className="detail-mrg-left">
                ${Number(coin['24hVolume']).toLocaleString('en-US')}
              </div>
            </div>
            <div>
              <div>Circulating Supply</div>
              <div className='detail-mrg-left'>{coin.supply.circulating}</div>
            </div>
            <div>
              <div>Total Supply</div>
              <div className='detail-mrg-left'>{coin.supply.total}</div>
            </div>
            <div>
              <div>Max Supply</div>
              <div className='detail-mrg-left'>{coin.supply.total}</div>
            </div>
          </div>
        </div>
        <div className='crypto-detail-right'>
          chart
        </div>
      </div>
    </>
  );
}

export default CryptoDetail;
