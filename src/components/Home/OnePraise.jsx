export default function OnePraise({litleImage, title, desc}) {
    return (
        <>
            <div className="one-container">
                    <img className="praise-img" src={litleImage} alt="worldwide icon" />
                    <div className="praise-title">{title}</div>
                    <div className="praise-desc">{desc}</div>
                </div>
        </>
    )
}