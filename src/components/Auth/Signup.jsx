import React, { useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateAvatar = (username) => {
        const baseUrl = "https://avataaars.io/";

        const hash = Array.from(username).reduce((acc, char) => acc + char.charCodeAt(0), 0);

        const topTypes = [
            "NoHair",
            "ShortHairDreads01",
            "ShortHairFrizzle",
            "ShortHairShaggy",
            "LongHairCurvy",
            "LongHairStraight",
        ];
        const accessoriesTypes = ["Blank", "Kurt", "Prescription02", "Round"];
        const facialHairTypes = ["Blank", "BeardMedium", "MoustacheFancy"];
        const clotheTypes = ["Hoodie", "BlazerShirt", "ShirtCrewNeck"];
        const eyeTypes = ["Wink", "Happy", "Squint", "Close"];
        const eyebrowTypes = ["RaisedExcited", "SadConcerned", "Default"];
        const mouthTypes = ["Smile", "Serious", "Disbelief"];
        const skinColors = ["Light", "Tanned", "Pale", "Brown", "DarkBrown"];

        // Helper function to select based on the hash
        const pickOption = (options) => options[hash % options.length];

        return `${baseUrl}?avatarStyle=Transparent&topType=${pickOption(topTypes)}&accessoriesType=${pickOption(
            accessoriesTypes
        )}&facialHairType=${pickOption(facialHairTypes)}&clotheType=${pickOption(clotheTypes)}&eyeType=${pickOption(
            eyeTypes
        )}&eyebrowType=${pickOption(eyebrowTypes)}&mouthType=${pickOption(mouthTypes)}&skinColor=${pickOption(skinColors)}`;
    };

    const handleSignup = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setLoading(true); // Set loading to true when signup starts
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const avatarUrl = generateAvatar(formData.username); // Generate avatar URL

            await updateProfile(user, { displayName: formData.username });

            // Save user data including avatar
            await setDoc(doc(db, "users", user.uid), {
                username: formData.username,
                email: formData.email,
                avatar: avatarUrl, // Save the avatar URL
            });

            setError("");
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after signup completes
        }
    };

    const handleLogin = async () => {
        setLoading(true); // Set loading to true when login starts
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                setError("");
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after login completes
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleSignup();
        }
    };

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <button className="auth-button" type="submit" disabled={loading}>
                    {loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
                </button>
            </form>
            <div className="auth-footer">
                <div className="have-an-acc">{isLogin ? "Don't have an account?" : "Already have an account?"}</div>
                <p className="log-sign" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Sign Up" : "Log In"}
                </p>
            </div>
        </div>
    );
}