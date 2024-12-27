import { useEffect, useState } from "react";
import TopTradable from "./Toptradable";
import TopGainers from "./Topgainer";



export default function HomeSection2(){
    const [topTradable, setTopTradable] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [gainers, setGainers] = useState([])
    const [tradableActive, setTradableActive] = useState(true)
    const [gainersActive, setGainersActive] = useState(false)

    useEffect(() => {
        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=6&page=1"
        )
        .then((response) => response.json())
        .then((data) => {
            setTopTradable(data);
            setIsLoading(false)
        })

        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=6&page=1"
        )
        .then((response) => response.json())
        .then((data) =>{
            setGainers(data)
            setIsLoading(false)
        })
        
    },[])

    function togleTradable(){
        setGainersActive(false)
        setTradableActive(true)
    }

    function togleGainers(){
        setGainersActive(true)
        setTradableActive(false)
    }

    return (
        <>
            <section className="homesec home-section2">
                <div className="div-gap">
                   <h2 className="second-title">Explore crypto like Bitcoin, Ethereum, and Dogecoin</h2>
                    <p className="second-desc">We're the most trusted place for people and businesses to buy, sell, and use crypto.</p>
                    <button className="second-btn button">Get started</button> 
                </div>
                
                <div>
                    <div className="trade-gainers">
                    <button className={`small-btn ${tradableActive ? "btn-active" : ""}`} onClick={togleTradable}>Tradable</button>
                    <button className={`small-btn ${gainersActive ? "btn-active" : ""}`} onClick={togleGainers}>Top gainers</button>
                </div>
                <div className="cryptos-subgrid">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : tradableActive ? (       
                        topTradable.map((tradable) => (
                            <TopTradable
                            key={tradable.id}
                            topImg={tradable.image}
                            topName={tradable.name}
                            topPrice={tradable.current_price}
                            topPercentage={tradable.price_change_percentage_24h}
                            />
                        ))
                    ): gainersActive ? (
                        gainers.map((gainer) => (
                            <TopGainers
                            key={gainer.id}
                            gainImg={gainer.image}
                            gainName={gainer.name}
                            gainPrice={gainer.current_price}
                            gainPercentage={gainer.price_change_percentage_24h}
                            />
                        ))
                    ) : (
                        <div>no data to display</div>
                    )}
                </div>
                </div>
            </section>
        </>
    )
}