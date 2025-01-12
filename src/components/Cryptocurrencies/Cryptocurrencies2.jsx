import React, { useState, useEffect } from 'react';
import CryptoList from './CryptoList';

function Cryptocurrencies2() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const options = {
            headers: {
                'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
            },
        };

        fetch('https://api.coinranking.com/v2/coins', options)
            .then((response) => response.json())
            .then((data) => {
                setCoins(data.data.coins);
                console.log(coins)
            });
    }, []);

    const formatToDollar = (amount) => {
        return `$${parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    const formatSparklineData = (sparkline) => {
        // Adjusting the values of the sparkline for display (you can adjust the scaling factor as needed)
        const scaledData = sparkline.map((value, index) => {
            const scaledValue = parseFloat(value) * (Math.random() * 1.5 + 1.5); // Randomly scaling values for more fluctuation
            return { value: scaledValue, name: index };
        });
        return scaledData;
    };

    // Custom tooltip function for styling
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <div className="tooltip-value">
                        Value: ${payload[0].value.toFixed(2)}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <section className='crypto-sec2'>
            <div className='crypto-title'>Crypto Prices</div>
            <div className='crypto-item crypto-header'>
                    <div className='crypto-name bold'>Name</div>
                    <div className='crypto-price bold cursor-pointer'>Price</div>
                    <div className='crypto-change bold cursor-pointer'>Change</div>
                    <div className='crypto-24hvolume bold cursor-pointer'>24h Volume</div>
                    <div className='crypto-chart bold'>Chart</div>
            </div>
            <CryptoList 
            coins={coins} 
            formatToDollar={formatToDollar} 
            formatSparklineData={formatSparklineData} 
            CustomTooltip={CustomTooltip} 
            />
        </section>
    );
}

export default Cryptocurrencies2;
