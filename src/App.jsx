import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Cryptocurrencies from "./pages/Cryptocurrencies/Cryptocurrencies";
import AuthPage from "./pages/AuthPage/AuthPage";
import CryptoDetail from "./components/Cryptocurrencies/CryptoDetail";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/Firebase"; // Adjust the import as necessary

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loader until auth state resolves
  }

  const PrivateRoute = ({ element, redirectTo }) => {
    return user ? element : <Navigate to={redirectTo} />;
  };

  const AuthGuard = ({ element, redirectTo }) => {
    return user ? <Navigate to={redirectTo} /> : element;
  };

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route
          path="/auth"
          element={<AuthGuard element={<AuthPage />} redirectTo="/" />}
        />
        <Route path="/crypto/:uuid" element={<CryptoDetail />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} redirectTo="/auth" />}
        />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
