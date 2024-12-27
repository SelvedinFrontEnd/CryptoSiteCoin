import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


export default function TopTradable({topImg, topName, topPercentage, topPrice}) {
    const formattedPrice = `$${topPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    return (
        <>
                    <div className="one-crypto">
                        <img className="one-crypto-img" src={topImg} alt="" />
                        <div className="coin-name-grid">{topName}</div>
                        <div className="price-grid">{formattedPrice}</div>
                        <div className="one-crypto-subgrid">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <div className="one-crypto-percentage">{topPercentage.toFixed(2)}%</div>
                        </div>
                    </div>
        </>
    )
}