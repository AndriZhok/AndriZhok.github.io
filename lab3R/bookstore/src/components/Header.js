import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Головна</Link></li>
        <li><Link to="/catalog">Каталог</Link></li>
        <li><Link to="/cart">Кошик</Link></li>
        <li><Link to="/account">Мій акаунт</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;