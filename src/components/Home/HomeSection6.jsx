import Advanced from "../../images/Advanced.webp"
import icon from "../../images/coin-icon.svg"

export default function HomeSection6(){
    return(
        <>  
            <section className="homesec5 home-section6">
                <img className="retail" src={Advanced} alt="" />
                <div className="padding">
                    <div className="title-flex">
                        <img src={icon} alt="" />
                        <h1 className="hero-title">ADVANCED</h1>
                    </div>
                    
                    <h2 className="h2">Powerful tools, designed for the advanced trader</h2>
                    <p className="hero-desc">Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.</p>
                    <button className="button5 button">Start trading</button>
                </div>
                
            </section>
        </>
    )
}