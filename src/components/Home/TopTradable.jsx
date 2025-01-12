import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";


export default function TopTradable({topImg, topName, topPercentage, topPrice}) {
    const formattedPrice = `$${topPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    return (
        <>
                    <div className="one-crypto">
                        <img className="one-crypto-img" src={topImg} alt="" />
                        <div className="coin-name-grid">{topName}</div>
                        <div className="price-grid">{formattedPrice}</div>
                        <div className="one-crypto-subgrid">
                        <FontAwesomeIcon className={faArrowDown ? "negative-arrow" : "positive-arrow"} icon={topPercentage < 0 ? faArrowDown : faArrowUp} />
                            <div className={topPercentage > 0 ? "one-crypto-percentage" : "negative-percentage"}>{topPercentage.toFixed(2)}%</div>
                        </div>
                    </div>
        </>
    )
}