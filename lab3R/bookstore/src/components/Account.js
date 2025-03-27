import React, { useEffect, useState } from "react";

const Account = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  return (
    <div>
      <h1>Мій акаунт</h1>
      <h2>Історія замовлень</h2>
      {orders.length === 0 ? (
        <p>Замовлень ще немає.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="order">
            <h3>Замовлення #{idx + 1} — {order.date}</h3>
            <ul>
              {order.items && Object.entries(order.items).map(([title, item]) => (
                <li key={title}>
                  {title} x {item.quantity} = {item.price * item.quantity} грн
                </li>
              ))}
            </ul>
            <p><strong>Разом:</strong> {order.items ? Object.values(order.items).reduce((acc, item) => acc + item.price * item.quantity, 0) : 0} грн</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Account;