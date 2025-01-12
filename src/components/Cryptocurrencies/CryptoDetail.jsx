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

  if (!coin) return <div>Loading...</div>;

  return (
    <>
      <div>
        <div className='crypto-detail-left'>
          <div className='detail-coin-head'>
            <img src={coin.iconUrl} alt="" />
            <div className="detail-coin-name"></div>
            <div className='detail-coin-shortname'></div>
            <div className='detail-coin-rank'></div>
          </div>
        </div>
        <div className='crypto-detail-right'>

        </div>
      </div>
    </>
  );
}

export default CryptoDetail;
