
import Navbar from "./Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Cryptocurrencies from "./pages/Cryptocurrencies/Cryptocurrencies";
import { BrowserRouter, Routes, Route } from "react-router-dom";




export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      
      <Route path="/" element={<HomePage />}/>
      <Route path="/cryptocurrencies" element={<Cryptocurrencies />}/>
    </Routes>
    </BrowserRouter>
  );
}
