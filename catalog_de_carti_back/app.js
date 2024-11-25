const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectare la MongoDB
mongoose.connect('mongodb://localhost:27017/catalog_de_carti', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectat la baza de date'));

// Rute
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Pornirea serverului
app.listen(5000, () => console.log('Server pornit pe portul 5000'));