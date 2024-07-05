const nanoId = require('nanoid');

const db = require('./db.service');

async function create(name, year, author, summary, publisher, pageCount, readPage, reading) {
  const id = nanoId.nanoid();
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    publisher,
  };

  const newBookDetail = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  db.set(id, { book: newBook, detail: newBookDetail });

  return id;
}

async function getAll(name, reading, finished) {
  const books = db.getAll();
  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.detail.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.detail.reading === !!parseInt(reading, 10));
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.detail.finished === !!parseInt(finished, 10));
  }

  return filteredBooks.map((book) => book.book);
}

async function get(bookId) {
  const book = db.get(bookId);

  if (!book) {
    return null;
  }

  return book.detail;
}

async function update(bookId, name, year, author, summary, publisher, pageCount, readPage, reading) {
  const book = db.get(bookId);

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const updatedBook = {
    id: bookId,
    name,
    publisher,
  };

  const updatedBookDetail = {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: book.detail.insertedAt,
    updatedAt,
  };

  db.set(bookId, { book: updatedBook, detail: updatedBookDetail });
}

async function remove(bookId) {
  db.remove(bookId);
}

module.exports = {
  create,
  getAll,
  get,
  update,
  remove,
};
