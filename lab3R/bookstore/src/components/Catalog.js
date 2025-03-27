import React, { useState, useEffect } from "react";
import books from "../data/books";
import BookCard from "./BookCard";

const Catalog = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || {});
  const [filterAuthor, setFilterAuthor] = useState("all");
  const [filterGenre, setFilterGenre] = useState("all");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    const updatedCart = { ...cart };
    if (!updatedCart[book.title]) {
      updatedCart[book.title] = { price: book.price, quantity: 1 };
    } else {
      updatedCart[book.title].quantity += 1;
    }
    setCart(updatedCart);
  };

  const authors = [...new Set(books.map(b => b.author))];
  const genres = [...new Set(books.map(b => b.genre))];

  const filteredBooks = books.filter(book => {
    const matchAuthor = filterAuthor === "all" || book.author === filterAuthor;
    const matchGenre = filterGenre === "all" || book.genre === filterGenre;
    return matchAuthor && matchGenre;
  });

  return (
    <div>
      <h1>Каталог книг</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>Фільтрувати за автором: </label>
        <select value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)}>
          <option value="all">Усі</option>
          {authors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>

        <label style={{ marginLeft: "1rem" }}>Фільтрувати за жанром: </label>
        <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
          <option value="all">Усі</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="book-grid">
        {filteredBooks.map(book => (
          <BookCard key={book.title} book={book} onAdd={addToCart} cart={cart} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;