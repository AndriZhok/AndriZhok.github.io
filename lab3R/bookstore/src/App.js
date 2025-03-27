import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import Account from "./components/Account";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<h1>Вітаємо в онлайн-магазині книг!</h1>} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;