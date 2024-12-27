import circle from "../../images/Type_Circles_4x.webp"

export default function HomeSection3(){
    return(
        <>  
            <section className="homesec home-section1 homesec3">
                <div> 
                    <h1 className="hero-title">Start your portofolio today and discover crypto</h1>
                    <p className="hero-desc">We're the most trusted place for people and businesses to buy, sell, and use crypto.</p>
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
               
                <img className="circle-coins" src={circle} alt="" />
            </section>
        </>
    )
}