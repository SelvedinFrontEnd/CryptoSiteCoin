import banner from "../../images/cb-banner.webp"

export default function HomeSection4(){
    return(
        <>  
            <section className="homesec home-section4">
                <div className="padding div-flex1">

                    <h1 className="hero-title">USDC is the dollar for the digital age</h1>
                    <div className="flex">
                        <p className="hero-desc">USDC gives you 24/7 access to payments and financial services. Trade, spend, and send faster and more efficiently.</p>
                        <button className="button white-btn">Learn more</button> 
                    </div>
                    
                </div>
                <img className="banner" src={banner} alt="" />
            </section>
        </>
    )
}