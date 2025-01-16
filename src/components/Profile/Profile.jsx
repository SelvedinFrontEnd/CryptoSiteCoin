import { useEffect, useState } from "react";
import avatar from "../../images/man.png";
import { auth, db, doc, getDoc, updateDoc } from '../../Firebase/Firebase';
import { useNavigate } from "react-router-dom";
import { arrayRemove, arrayUnion } from "firebase/firestore";

export default function Profile({ 
    handleLogout, userData, setUserData,
    formData, handleInputChange, handleSave,
    isEditing, setIsEditing, isDepositModalOpen,
    setIsDepositModalOpen, handleDeposit,
    handleWithdraw, isWithdrawModalOpen, setIsWithdrawModalOpen,
    error,
    }) {
    const [favorites, setFavorites] = useState([]); // store favorite coin IDs
    const [favoriteCoins, setFavoriteCoins] = useState([]); // store full coin details
    const [loading, setLoading] = useState(false);
    const [withdrawError, setWithdrawError] = useState(""); // New state for withdraw error
    const navigate = useNavigate();
    const BTC_TO_USD = 94851.39; // 1 BTC = $94,851.39

    const formatToBitcoin = (usdAmount) => {
        const bitcoinAmount = usdAmount / BTC_TO_USD;
        return bitcoinAmount.toFixed(4);
    };

    const formatToDollar = (valueInUSD) => {
        const numericValue = parseFloat(valueInUSD);
        if (isNaN(numericValue)) {
            return "$0.00";
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numericValue);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setFavorites(userDoc.data().favorites || []);
                }
            }
        };
        fetchFavorites();
    }, []);

    useEffect(() => {
        const fetchCoinDetails = async () => {
            setLoading(true);
            const coinDetails = [];
            for (let id of favorites) {
                const options = {
                    headers: {
                        'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
                    },
                };
                const response = await fetch(`https://api.coinranking.com/v2/coin/${id}`, options);
                const data = await response.json();
                if (data.data) {
                    coinDetails.push(data.data.coin);
                }
            }
            setFavoriteCoins(coinDetails);
            setLoading(false);
        };
        if (favorites.length > 0) {
            fetchCoinDetails();
        }
    }, [favorites]);

    const handleClick = (uuid) => {
        navigate(`/crypto/${uuid}`);
    };

    const removeFromFavorites = async (uuid, coinName) => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const now = new Date();
            const currentDate = now.toLocaleDateString();
            const currentTime = now.toLocaleTimeString();
            const activityMessage = `You have removed ${coinName} from favorites at ${currentTime} ${currentDate}`;
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const updatedFavorites = favorites.filter((id) => id !== uuid);
                setFavorites(updatedFavorites);
                if (updatedFavorites.length === 0) {
                    setFavoriteCoins([]);
                }
                const updatedActivity = Array.isArray(userData.activity)
                    ? arrayUnion(activityMessage)
                    : [activityMessage];
                await updateDoc(userDocRef, {
                    favorites: arrayRemove(uuid),
                    activity: updatedActivity,
                });
                setUserData((prev) => ({
                    ...prev,
                    activity: [...(prev.activity || []), activityMessage],
                }));
            }
        }
    };

    return (
        <>
            <div className="profile-header">
                <div className="user-head">
                    <div className="avatar-background">
                        <img className="user-avatar" src={userData.avatar} alt="" />
                    </div>
                    <h3 className="username">{userData.username}</h3>
                </div>
                <div className="uid-container">
                    <div className="uid-title">UID</div>
                    <div className="uid">123456</div>
                </div>
                <div className="header-balance">
                    <div className="balance">Balance</div>
                    <div className="balance-amount">{formatToDollar(userData.balance)}</div>
                </div>
                <button onClick={() => setIsEditing(!isEditing)} className="edit-btn profile-button">Edit Profile</button>
                <button onClick={() => handleLogout()} className="logout profile-button">Logout</button>
            </div>

            <div className="estimated-balance">
                <div className="balance-header">
                    <h3>Estimated Balance</h3>
                    <button onClick={() => setIsDepositModalOpen(true)} className="deposit profile-button">Deposit</button>
                    <button onClick={() => setIsWithdrawModalOpen(true)} className="withdraw profile-button">Withdraw</button>
                    <button className="cash-in profile-button">Cash In</button>
                </div>
                <div className="valutes">
                    <div className="current-balance">
                        {formatToBitcoin(userData.balance)} <span className="crypto-formated">BTC</span>
                    </div>
                    <div className="real-value">
                       = {formatToDollar(userData.balance)}
                    </div>
                </div>
            </div>

            <div className="favorite-coins">
                <h3>Favorite Coins</h3>
                <div className="favorite-coins-header">
                    <div>Name</div>
                    <div>Price</div>
                </div>
                <div className="favorite-coins-list">
                    {loading ? (
                        <div>Loading...</div>
                    ) : favoriteCoins.length > 0 ? (
                        favoriteCoins.map((coin, index) => (
                            <div key={index} className="coin-wrapper">
                                <div className="favorite-coin" onClick={() => handleClick(coin.uuid)}>
                                    <div className='crypto-names-container'>
                                        <div className='crypto-icon'>
                                            <img src={coin.iconUrl || avatar} alt='crypto-icon' />
                                        </div>
                                        <div className='crypto-name-flex'>
                                            <div className='crypto-name'>{coin.name}</div>
                                            <div className='crypto-short-name'>{coin.symbol}</div>
                                        </div>
                                    </div>
                                    <div>{formatToDollar(coin.price)}</div>
                                </div>
                                <button className="remove-from-favorites" onClick={() => removeFromFavorites(coin.uuid, coin.name)}>-</button>
                            </div>
                        ))
                    ) : (
                        <div>You have no favorite coins</div>
                    )}
                </div>
            </div>

            <div className="user-activity">
                <h3>User Activity</h3>
                <div className="activity-list">
                {userData.activity && userData.activity.length > 0 ? (
                    userData.activity.slice().reverse().map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))
                ) : (
                    <li>No activity recorded</li>
                )}
                </div>
            </div>

            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Edit Profile</h2>
                        <form>
                            <label className="modal-label">Username:</label>
                            <input 
                                type="text" 
                                value={formData.username} 
                                onChange={handleInputChange} 
                                name="username"
                            />
                            <div className="form-buttons">
                                <button type="button" onClick={() => setIsEditing(false)} className="close-btn">Close</button>
                                <button 
                                    type="button"
                                    className="save-btn"
                                    onClick={handleSave}
                                >Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isDepositModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Deposit</h2>
                        <form>
                            <label className="modal-label">Amount:</label>
                            <input
                                type="number"
                                onChange={handleInputChange}
                                name="balance"
                                min="0"
                                placeholder="Enter amount"
                            />
                            <div className="form-buttons">
                                <button 
                                    type="button" 
                                    className="close-btn"
                                    onClick={() => setIsDepositModalOpen(false)}
                                >Close
                                </button>
                                <button 
                                    type="button" 
                                    className="save-btn"
                                    onClick={() => {
                                        handleDeposit();
                                        setIsDepositModalOpen(false);
                                    }}
                                >
                                    Deposit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
             {isWithdrawModalOpen && ( // New modal for withdraw
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Withdraw</h2>
                        <form>
                            <label className="modal-label">Amount:</label>
                            <input
                                type="number"
                                onChange={handleInputChange}
                                name="balance"
                                min="0"
                                placeholder="Enter amount"
                            />
                            {withdrawError && <div className="error-message">{withdrawError}</div>} {/* Display error message */}
                            <div className="form-buttons">
                                <button 
                                    type="button" 
                                    className="close-btn"
                                    onClick={() => {
                                        setIsWithdrawModalOpen(false);
                                        setWithdrawError(""); // Reset error state
                                    }}
                                >Close
                                </button>
                                <button 
                                    type="button" 
                                    className="save-btn"
                                    onClick={async () => {
                                        const error = await handleWithdraw();
                                        if (!error) {
                                            setIsWithdrawModalOpen(false);
                                        } else {
                                            setWithdrawError(error);
                                        }
                                    }}
                                >
                                    Withdraw
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}