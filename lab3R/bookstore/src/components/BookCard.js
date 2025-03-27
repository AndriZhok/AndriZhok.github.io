import React from "react";

const BookCard = ({ book, onAdd, cart }) => {
  const isAdded = cart[book.title];

  return (
    <div className="book-card">
      <img src={book.image} alt="обкладинка книги" />
      <h3>{book.title}</h3>
      <p>Автор: {book.author}</p>
      <p>Ціна: {book.price} грн</p>
      <button
        onClick={() => onAdd(book)}
        className={isAdded ? "added" : ""}
      >
        {isAdded ? "Додано" : "Додати до кошика"}
      </button>
    </div>
  );
};

export default BookCard;