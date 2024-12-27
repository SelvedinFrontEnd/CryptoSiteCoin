export default function Basic({basicImg, basicTitle, basicDesc}) {
    return (
        <>
            <div className="basic">
                <img className="basic-img" src={basicImg} alt="image" />
                <div className="basic-title">{basicTitle}</div>
                <div className="basic-desc">{basicDesc}</div>
            </div>
        </>
    )
}