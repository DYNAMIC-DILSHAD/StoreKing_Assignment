import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProducsList from "./components/ProducsList";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/products" element={<ProducsList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
