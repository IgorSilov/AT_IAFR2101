import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function BookDetail() {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Autor:</strong> {book.author}</p>
      {book.genre && <p><strong>Gen:</strong> {book.genre}</p>}
      {book.description && <p><strong>Descriere:</strong> {book.description}</p>}
      <Link to={`/edit/${book._id}`}>
        <button>Editează</button>
      </Link>
      <Link to="/">
        <button>Înapoi la listă</button>
      </Link>
    </div>
  );
}

export default BookDetail;