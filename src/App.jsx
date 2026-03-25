import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProducsList from "./components/ProducsList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/products" element={<ProducsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
