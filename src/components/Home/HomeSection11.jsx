import Basic from "./Basic";
import coinDolar from "../../images/0_4mVyVaU6yLa--GR_.webp"
import ilustration from "../../images/Learn_Illustration_Ultimate_Guide_Bitcoin.webp"
import bank from "../../images/Replace_Bank.webp"


export default function HomeSection11() {
    return (
        <>
            <section className="homesec home-section11">
                <div className="praise-mobile padding">
                    <div className="praise-mobile1">
                        <div className="hero-title">New to crypto? Learn some crypto basics</div>
                        <p className="hero-last-desc">Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between</p>
                    </div>
                    
                    <button className="button mrg-left">Read more</button>
                </div>
                <div className="basics">
                    <Basic 
                    basicImg={coinDolar}
                    basicTitle="USDC: The digital dollar for the global crypto economy"
                    basicDesc="Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more equitable. We co-founded the Centre Consortium in 2018 to invest in the build of USDC, and since then it has become the second largest stablecoin by market capitalization."
                    />
                    <Basic 
                    basicImg={bank}
                    basicTitle="Can crypto really replace your bank account?"
                    basicDesc="If you’re a big enough fan of crypto, you’ve probably heard the phrase “be your own bank” or the term “bankless” — the idea being that crypto can offer more control over your financial future than traditional finance. But how much of your financial life really can be accomplished via crypto?"
                    />
                    <Basic 
                    basicImg={ilustration}
                    basicTitle="When is the best time to invest in crypto?"
                    basicDesc="Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause uncertainty, fear of missing out, or fear of participating at all. When prices are fluctuating, how do you know when to buy?"
                    />
                </div>
            </section>
            
        </>
    )
}