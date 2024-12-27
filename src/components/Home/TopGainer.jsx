import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


export default function TopGainers({gainImg, gainName, gainPercentage, gainPrice}) {
    const formattedPrice = `$${gainPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    return (
        <>
                    <div className="one-crypto">
                        <img className="one-crypto-img" src={gainImg} alt="" />
                        <div className="coin-name-grid">{gainName}</div>
                        <div className="price-grid">{formattedPrice}</div>
                        <div className="one-crypto-subgrid">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <div className="one-crypto-percentage">{gainPercentage.toFixed(2)}%</div>
                        </div>
                    </div>
        </>
    )
}