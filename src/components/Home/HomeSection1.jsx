import hero from "../../images/hero_3x_B.webp"
import bitcoin from "../../images/bitcoin.svg"
import arrow from "../../images/arrow.svg"

export default function HomeSection1(){
    return(
        <>  
            <section className="homesec home-section1">
                <div className="jumpstart">
                   <img src={bitcoin} alt="bitcoin icon" /> 
                   <p className="blue underline">Jump start your portofolio</p>
                   <img src={arrow} alt="arrow icon" />
                </div>
                
                <div className="flex-home1">
                    <div className="left-side-section1">
                        <img className="hero" src={hero} alt="hero image" />
                    </div>
                
                <div>
                     <div>
                         <div className="main-title">The future of money is here</div>
                        <p className="main-desc">We're the most trusted place for people and businesses to buy, sell, and use crypto.</p>
                    </div>
                   
                    <form className="hero-form">
                        <label htmlFor="">Email adress</label>
                        <br></br>
                        <div className="input-button">
                        <div className="hero-div-input">
                            <input placeholder="Email" className="hero-input"/>
                        </div>

                        <button className="button">Get started</button>  
                    </div> 
                    </form>
                </div>
                   
                </div>
                
                    
                
            </section>
        </>
    )
}