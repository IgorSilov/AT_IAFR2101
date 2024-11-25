import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetail from './components/BookDetail';

function app() {
  return (
    <Router>
      <div>
        <header>
          <h1>Catalog de Cărți</h1>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<BookForm />} />
            <Route path="/edit/:id" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </div>
        <footer>
          <p>&copy; 2023 Catalog de Cărți</p>
        </footer>
      </div>
    </Router>
  );
}

export default app;
