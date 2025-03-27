import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || {};
      const now = Date.now();
      const FIFTEEN_MIN = 15 * 60 * 1000;

      const filtered = Object.fromEntries(
        Object.entries(stored).filter(([_, item]) => {
          return !item.timestamp || now - item.timestamp < FIFTEEN_MIN;
        })
      );

      setCart(filtered);
    };

    loadCart(); // початково

    const interval = setInterval(loadCart, 1000); // оновлювати щосекунди

    window.addEventListener("focus", loadCart);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadCart);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const FIFTEEN_MIN = 15 * 60 * 1000;
      const filtered = Object.fromEntries(
        Object.entries(cart).filter(([_, item]) => {
          return !item.timestamp || now - item.timestamp < FIFTEEN_MIN;
        })
      );
      if (Object.keys(filtered).length !== Object.keys(cart).length) {
        setCart(filtered);
      }
    }, 60000); // оновлювати щохвилини

    return () => clearInterval(interval);
  }, [cart]);

  useEffect(() => {
    const sum = Object.values(cart).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (title, quantity) => {
    const updated = { ...cart };
    if (quantity <= 0) {
      delete updated[title];
    } else {
      updated[title].quantity = quantity;
      updated[title].timestamp = Date.now();
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const checkout = () => {
    if (Object.keys(cart).length === 0) return;
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ date: new Date().toLocaleString(), items: { ...cart } });
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Дякуємо! Ваше замовлення оформлено.");
    setCart({});
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const syncCartAcrossTabs = (e) => {
      if (e.key === "cart") {
        const updatedCart = JSON.parse(e.newValue) || {};
        setCart(updatedCart);
      }
    };

    window.addEventListener("storage", syncCartAcrossTabs);

    return () => {
      window.removeEventListener("storage", syncCartAcrossTabs);
    };
  }, []);

  console.log("Поточний кошик:", cart);

  return (
    <div>
      <h1>Кошик</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <>
          <ul>
            {Object.entries(cart).map(([title, item]) => (
              <li key={title}>
                {title} x
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  data-title={title}
                  className="cart-quantity"
                  onChange={(e) =>
                    updateQuantity(title, parseInt(e.target.value))
                  }
                />
                = {item.price * item.quantity} грн
              </li>
            ))}
          </ul>
          <p>Разом: {total} грн</p>
          <button onClick={checkout} disabled={Object.keys(cart).length === 0}>
            Оформити замовлення
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;