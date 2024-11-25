import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios
      .get('http://localhost:5000/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => getBooks())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Cărți</h2>
        <Link to="/add">
          <button>Adaugă o carte</button>
        </Link>
      </div>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book._id}>
            <h2>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </h2>
            <p><strong>Autor:</strong> {book.author}</p>
            {book.genre && <p><strong>Gen:</strong> {book.genre}</p>}
            <div className="actions">
              <Link to={`/edit/${book._id}`}>
                <button>Editează</button>
              </Link>
              <button onClick={() => deleteBook(book._id)}>Șterge</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;