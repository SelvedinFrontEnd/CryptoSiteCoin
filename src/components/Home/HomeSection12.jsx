import tools from "../../images/tools.webp"

export default function HomeSection12() {
    return(
        <>
            <section className="home-section12 home-section6">
                <img className="tools" src={tools} alt="" />
                <div className="padding">
                    
                    <h1 className="hero-title">The freedom of crypto for everyone, everywhere</h1>
                    <p className="hero-desc">We're committed to creating more economic freedom through accessible, safe, and secure financial tools for everyone.</p>
                    <button className="button">Learn more</button>
                </div>
            </section>
        </>
    )
}