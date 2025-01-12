import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as yellowStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth, db, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from '../../Firebase/Firebase'; // Import necessary Firebase services

export default function CryptoList({ coins, formatToDollar, formatSparklineData, CustomTooltip }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]); // State for storing the user's favorites
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = coins.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(coins.length / itemsPerPage);

    // Fetch user's favorites from Firestore on component mount or when favorites change
    useEffect(() => {
        const fetchFavorites = async () => {
            const user = auth.currentUser; // Get current logged-in user
            if (user) {
                const userDocRef = doc(db, "users", user.uid); // Reference to the user's Firestore document
                const userDoc = await getDoc(userDocRef); // Get the document from Firestore

                if (userDoc.exists()) {
                    setFavorites(userDoc.data().favorites || []); // Update the favorites state with data from Firestore
                }
            }
        };
        fetchFavorites(); // Call the function to fetch the favorites
    }, []); // Run only once on component mount

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        handleScrollToTop();
    }, [currentPage]);

    const handleClick = (uuid) => {
        navigate(`/crypto/${uuid}`);
    };

    const toggleFavorite = async (uuid, coinName) => {
        const user = auth.currentUser; // Get the current logged-in user
    
        if (user) {
            const userDocRef = doc(db, "users", user.uid); // Reference to the user's Firestore document
    
            const now = new Date();
            const currentDate = now.toLocaleDateString();
            const currentTime = now.toLocaleTimeString();
    
            if (favorites.includes(uuid)) {
                // Remove from favorites
                setFavorites(favorites.filter((id) => id !== uuid)); // Update local state
                
                // Construct the activity message for removal
                const activityMessage = `You have removed ${coinName} from favorites at ${currentTime} ${currentDate}`;
                
                // Update the user's Firestore document
                await updateDoc(userDocRef, {
                    favorites: arrayRemove(uuid), // Remove the coin UUID from the favorites array in Firestore
                    activity: arrayUnion(activityMessage) // Add the activity message to the activity array
                });
            } else {
                // Add to favorites
                // Construct the activity message for addition
                const activityMessage = `You have added ${coinName} to favorites at ${currentTime} ${currentDate}`;
                
                // Update local state
                setFavorites([...favorites, uuid]);
    
                // Update the user's Firestore document
                await updateDoc(userDocRef, {
                    favorites: arrayUnion(uuid), // Add the coin UUID to the favorites array in Firestore
                    activity: arrayUnion(activityMessage) // Add the activity message to the activity array
                });
            }
        } else {
            console.log("User not logged in");
        }
    };
    
    

    return (
        <>
            <div className="crypto-list">
                {currentItems.map((coin) => (
                    <div className="crypto-flex" key={coin.uuid}>
                        <FontAwesomeIcon
                            icon={favorites.includes(coin.uuid) ? solidStar : yellowStar}
                            style={{ fontSize: "18px", color: favorites.includes(coin.uuid) ? "gold" : "gray" }}
                            onClick={() => toggleFavorite(coin.uuid, coin.name)}
                        />
                        <div className="crypto-item" onClick={() => handleClick(coin.uuid)}>
                            <div className="crypto-names-container">
                                <div className="crypto-icon">
                                    <img src={coin.iconUrl} alt="crypto-icon" />
                                </div>
                                <div className="crypto-name-flex">
                                    <div className="crypto-name">{coin.name}</div>
                                    <div className="crypto-short-name">{coin.symbol}</div>
                                </div>
                            </div>
                            <div className="crypto-price">{formatToDollar(coin.price)}</div>
                            <div className={coin.change > 0 ? "crypto-change" : "crypto-change-negative"}>
                                {coin.change}%
                            </div>
                            <div className="crypto-24hvolume">
                                ${coin['24hVolume'] ? parseInt(coin['24hVolume']).toLocaleString() : "N/A"}
                            </div>
                            <div className="crypto-chart">
                                {coin.sparkline ? (
                                    <ResponsiveContainer width="100%" height={50}>
                                        <LineChart data={formatSparklineData(coin.sparkline)}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line
                                                type="linear"
                                                dataKey="value"
                                                stroke={coin.color || "#f7931A"}
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div>No Sparkline Data</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <button
                    className="prev-button"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="next-button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}
