import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function BookForm() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => setBook(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!book.title) tempErrors.title = 'Titlul este obligatoriu';
    if (!book.author) tempErrors.author = 'Autorul este obligatoriu';
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = validate();
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      if (id) {
        axios
          .put(`http://localhost:5000/books/${id}`, book)
          .then(() => navigate('/'))
          .catch((err) => console.error(err));
      } else {
        axios
          .post('http://localhost:5000/books', book)
          .then(() => navigate('/'))
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <div>
      <h2>{id ? 'Editează Cartea' : 'Adaugă o Carte'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titlu:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
          {errors.author && <p>{errors.author}</p>}
        </div>
        <div>
          <label>Gen:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descriere:</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Salvează</button>
        <Link to="/">
          <button type="button">Anulează</button>
        </Link>
      </form>
    </div>
  );
}

export default BookForm;