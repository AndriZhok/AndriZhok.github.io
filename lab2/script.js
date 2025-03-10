document.addEventListener("DOMContentLoaded", () => {
  const books = [
      { title: "Програмування мовою С", author: "Степан", price: 300, image: "images/hitler.png" },
      { title: "МОТИВАЦІЯ", author: "Автор книги", price: 250, image: "images/hitler.png" },
      { title: "Дизайн UX/UI", author: "Марія", price: 280, image: "images/hitler.png" },
      { title: "JavaScript для початківців", author: "Андрій", price: 350, image: "images/hitler.png" }
  ];

  const bookList = document.getElementById("book-list");
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  
  let cart = {};

  // Генерація випадкових книг
  for (let i = 0; i < 3; i++) {
      let randomBook = books[Math.floor(Math.random() * books.length)];
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.innerHTML = `
          <img src="${randomBook.image}" alt="обкладинка книги">
          <h2>${randomBook.title}</h2>
          <p>Автор: ${randomBook.author}</p>
          <p>Ціна: ${randomBook.price} грн</p>
          <button class="add-to-cart" data-title="${randomBook.title}" data-price="${randomBook.price}">Додати до кошика</button>
      `;
      bookList.appendChild(bookCard);
  }

  // Оновлення кошика
  function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;
      for (let title in cart) {
          let item = cart[title];
          let li = document.createElement("li");
          li.innerHTML = `
              ${title} x ${item.quantity} = ${item.price * item.quantity} грн
              <input type="number" value="${item.quantity}" min="1" data-title="${title}" class="cart-quantity">
          `;
          cartItems.appendChild(li);
          total += item.price * item.quantity;
      }
      totalPriceElement.textContent = total;
  }

  // Додавання в кошик
  document.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart")) {
          let title = event.target.getAttribute("data-title");
          let price = parseFloat(event.target.getAttribute("data-price"));

          if (!cart[title]) {
              cart[title] = { price: price, quantity: 1 };
          } else {
              cart[title].quantity++;
          }

          event.target.classList.add("added");
          event.target.textContent = "Додано";
          updateCart();
      }
  });

  // Зміна кількості товару в кошику
  document.addEventListener("input", (event) => {
      if (event.target.classList.contains("cart-quantity")) {
          let title = event.target.getAttribute("data-title");
          let newQuantity = parseInt(event.target.value);
          if (newQuantity > 0) {
              cart[title].quantity = newQuantity;
          }
          updateCart();
      }
  });
});