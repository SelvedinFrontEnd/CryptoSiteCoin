import Profile from "../../components/Profile/Profile";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        uid: "",
        username: "",
        email: "",
        avatar: "",
        balance: "",
        activity: "",
    });
    const [formData, setFormData] = useState({
        uid: "",
        username: "",
        email: "",
        avatar: "",
        balance: "",
        activity: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false); // New state for withdraw modal

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserData({
                            uid: user.uid,
                            username: data.username,
                            email: data.email,
                            avatar: data.avatar,
                            balance: data.balance,
                            activity: data.activity,
                        });
                        setFormData(data);
                    } else {
                        setError("User data not found!");
                    }
                } else {
                    navigate("/auth");
                }
            } catch (err) {
                setError("Failed to load user data!");
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/auth");
        } catch (err) {
            setError("Failed to logout!");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, "users", user.uid), formData);
                setUserData(formData);
                setIsEditing(false);
                setError("");
            } else {
                navigate("/auth");
            }
        } catch (err) {
            setError("Failed to save changes!");
        }
    };

    const handleDeposit = async () => {
        try {
            const depositAmount = parseFloat(formData.balance);
            if (isNaN(depositAmount) || depositAmount <= 0) {
                setError("Please enter a valid deposit amount greater than 0.");
                return;
            }

            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    let currentBalance = data.balance || 0;
                    const newBalance = currentBalance + depositAmount;
                    const now = new Date();
                    const currentDate = now.toLocaleDateString();
                    const currentTime = now.toLocaleTimeString();
                    const activityMessage = `You have deposited $${depositAmount} at ${currentTime} ${currentDate}`;

                    await updateDoc(doc(db, "users", user.uid), {
                        balance: newBalance,
                        activity: [...(data.activity || []), activityMessage],
                    });

                    setUserData({
                        uid: user.uid,
                        username: data.username,
                        email: data.email,
                        avatar: data.avatar,
                        balance: newBalance,
                        activity: [...(data.activity || []), activityMessage],
                    });

                    setIsDepositModalOpen(false);
                } else {
                    setError("User data not found.");
                }
            }
        } catch (err) {
            console.error("Deposit failed", err);
            setError("Failed to deposit funds.");
        }
    };

    const handleWithdraw = async () => {
        try {
            const withdrawAmount = parseFloat(formData.balance);
            if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
                return "Please enter a valid withdraw amount greater than 0.";
            }

            if (withdrawAmount < 20) {
                return "The minimum withdraw amount is $20.";
            }

            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    let currentBalance = data.balance || 0;
                    if (withdrawAmount > currentBalance) {
                        return "Insufficient balance.";
                    }
                    const newBalance = currentBalance - withdrawAmount;
                    const now = new Date();
                    const currentDate = now.toLocaleDateString();
                    const currentTime = now.toLocaleTimeString();
                    const activityMessage = `You have withdrawn $${withdrawAmount} at ${currentTime} ${currentDate}`;

                    await updateDoc(doc(db, "users", user.uid), {
                        balance: newBalance,
                        activity: [...(data.activity || []), activityMessage],
                    });

                    setUserData({
                        uid: user.uid,
                        username: data.username,
                        email: data.email,
                        avatar: data.avatar,
                        balance: newBalance,
                        activity: [...(data.activity || []), activityMessage],
                    });

                    return null; // No error
                } else {
                    return "User data not found.";
                }
            }
        } catch (err) {
            console.error("Withdraw failed", err);
            return "Failed to withdraw funds.";
        }
    };

    return (
        <div className="profile-page">
            <Profile
                handleLogout={handleLogout}
                userData={userData}
                setUserData={setUserData} // Pass setUserData as a prop
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isDepositModalOpen={isDepositModalOpen}
                setIsDepositModalOpen={setIsDepositModalOpen}
                handleDeposit={handleDeposit}
                handleWithdraw={handleWithdraw}
                isWithdrawModalOpen={isWithdrawModalOpen}
                setIsWithdrawModalOpen={setIsWithdrawModalOpen}
                error={error}
            />
        </div>
    );
}