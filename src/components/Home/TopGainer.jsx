import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";


export default function TopGainers({gainImg, gainName, gainPercentage, gainPrice}) {
    const formattedPrice = `$${gainPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    return (
        <>
                    <div className="one-crypto">
                        <img className="one-crypto-img" src={gainImg} alt="" />
                        <div className="coin-name-grid">{gainName}</div>
                        <div className="price-grid">{formattedPrice}</div>
                        <div className="one-crypto-subgrid">
                            <FontAwesomeIcon className={faArrowDown ? "negative-arrow" : "positive-arrow"} icon={gainPercentage < 0 ? faArrowDown : faArrowUp} />
                            <div className={gainPercentage > 0 ? "one-crypto-percentage" : "negative-percentage"}>{gainPercentage.toFixed(2)}%</div>
                        </div>
                    </div>
        </>
    )
}