import Wallet from "../../images/Wallet.webp"
import icon from "../../images/coin-icon.svg"

export default function HomeSection7(){
    return(
        <>  
            <section className="homesec5 home-section6">
                <img className="retail" src={Wallet} alt="" />
                <div className="padding">
                    <div className="title-flex">
                        <img src={icon} alt="" />
                        <h1 className="hero-title">WALLET</h1>
                    </div>
                    
                    <h2 className="h2">Do more with your crypto with Coinbase Wallet</h2>
                    <p className="hero-desc">Store your crypto in your own personal crypto wallet and explore decentralized finance (DeFi), buy and sell NFTs, and more.</p>
                    <button className="button5 button">Learn more</button>
                </div>
                
            </section>
        </>
    )
}