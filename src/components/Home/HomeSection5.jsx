import Retail from "../../images/Retail.webp"
import icon from "../../images/coin-icon.svg"

export default function HomeSection5(){
    return(
        <>  
            <section className="homesec5 home-section5 home-section6">
                <img className="retail" src={Retail} alt="" />
                <div className="padding">
                    <div className="title-flex">
                        <img src={icon} alt="" />
                        <h1 className="hero-title">COINBASE</h1>
                    </div>
                    
                    <h2 className="h2">Buy, sell, and store hundreds of cryptocurrenci</h2>
                    <p className="hero-desc">From Bitcoin to Dogecoin, we make it easy to buy and sell cryptocurrency. Protect your crypto with best in class cold storage.</p>
                    <button className="button5 button">Learn more</button>
                </div>
                
            </section>
        </>
    )
}