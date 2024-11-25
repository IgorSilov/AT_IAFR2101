const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Obține toate cărțile
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obține o carte după ID
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Creează o carte
router.post('/', async (req, res) => {
  const { title, author, genre, description } = req.body;

  const book = new Book({
    title,
    author,
    genre,
    description,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizează o carte
router.put('/:id', getBook, async (req, res) => {
  const { title, author, genre, description } = req.body;

  if (title != null) res.book.title = title;
  if (author != null) res.book.author = author;
  if (genre != null) res.book.genre = genre;
  if (description != null) res.book.description = description;

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Șterge o carte
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Cartea a fost ștearsă' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pentru obținerea unei cărți după ID
async function getBook(req, res, next) {
  let book;

  try {
    book = await Book.findById(req.params.id);
    if (book == null)
      return res.status(404).json({ message: 'Nu am putut găsi cartea' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
