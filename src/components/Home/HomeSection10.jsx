import worldwide from "../../images/worldwide-2.svg"
import safe from "../../images/safe-2.svg"
import support from "../../images/support-3.svg"
import economy from "../../images/economyGlobal-2.svg"
import OnePraise from "./OnePraise"

export default function HomeSection10() {
    return (
        <>
        <section className="home-section6">
            
            <div className="praise-mobile padding">
                <div className="praise-mobile1">
                    <h2 className="h2">The most trusted cryptocurrency exchange</h2>
                    <p className="hero-desc">We're the most trusted place for people and businesses to buy, sell, and manage crypto.</p>
                </div>         
                
                <button className="button mrg-left">Sign up</button>
            </div>
            <div className="praise-containers">
            <OnePraise
            litleImage={worldwide}
            title="The largest public crypto company"
            desc="We operate with financial transparency."
            />        
            <OnePraise
            litleImage={safe}
            title="Your assets are protected"
            desc="Our risk management measures are designed to protect your assets."
            />      
            <OnePraise
            litleImage={support}
            title="Get the help you need, when you need it"
            desc="You can always contact our support team for quick solutions to common problems"
            />      
            <OnePraise
            litleImage={economy}
            title="Industry best practices"
            desc="Coin base supports a variety of the most popular digital currencies."
            />          
            </div>
                        
        </section>
        </>
    )
}