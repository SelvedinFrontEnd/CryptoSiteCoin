import Prime from "../../images/Prime.webp"
import icon from "../../images/coin-icon.svg"

export default function HomeSection8(){
    return(
        <>  
            <section className="homesec5 home-section6">
                <img className="retail" src={Prime} alt="" />
                <div className="padding">
                    <div className="title-flex">
                        <img src={icon} alt="" />
                        <h1 className="hero-title">PRIME</h1>
                    </div>
                    
                    <h2 className="h2">The financial institution for a digital asset future</h2>
                    <p className="hero-desc">Coinbase Prime is the first choice for sophisticated investors and institutions that want to invest in digital assets.</p>
                    <button className="button5 button">Learn more</button>
                </div>
                
            </section>
        </>
    )
}