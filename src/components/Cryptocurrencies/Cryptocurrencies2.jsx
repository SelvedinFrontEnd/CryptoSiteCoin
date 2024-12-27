import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
            <div className='crypto-list'>
                {coins.map((coin) => (
                    <div className='crypto-item' key={coin.uuid}>
                        <div className='crypto-names-container'>
                            <div className='crypto-icon'>
                                <img src={coin.iconUrl} alt='crypto-icon' />
                            </div>
                            <div className='crypto-name-flex'>
                                <div className='crypto-name'>{coin.name}</div>
                                <div className='crypto-short-name'>{coin.symbol}</div>
                            </div>
                        </div>
                        <div className='crypto-price'>{formatToDollar(coin.price)}</div>
                        <div className='crypto-change'>{coin.change}%</div>
                        <div className='crypto-24hvolume'>
                            ${coin['24hVolume'] ? parseInt(coin['24hVolume']).toLocaleString() : 'N/A'}
                        </div>
                        <div className='crypto-chart'>
                            {coin.sparkline ? (
                                <ResponsiveContainer width="100%" height={50}>
                                    <LineChart data={formatSparklineData(coin.sparkline)}>
                                        <XAxis dataKey="name" hide />
                                        <YAxis hide />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line 
                                            type="linear" 
                                            dataKey="value" 
                                            stroke={coin.color || "#f7931A"}  // Each coin uses its unique color (or fallback to #f7931A)
                                            strokeWidth={2} 
                                            dot={false} 
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div>No Sparkline Data</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Cryptocurrencies2;
