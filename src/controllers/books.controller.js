const booksService = require('../services/books.service');

const create = async (request, h) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (!name) {
      const error = new Error('Gagal menambahkan buku. Mohon isi nama buku');
      error.statusCode = 400;
      throw error;
    }

    if (readPage > pageCount) {
      const error = new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
      error.statusCode = 400;
      throw error;
    }

    const id = await booksService.create(name, year, author, summary, publisher, pageCount, readPage, reading);

    return h.response({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: id } }).code(201);
  }
  catch (err) {
    console.error('Error while creating a book', err.message);
    return h.response({ status: 'fail', message: err.message }).code(err.statusCode || 500);
  }
}

const getAll = async (request, h) => {
  try {
    const { name, reading, finished } = request.query;

    const books = await booksService.getAll(name, reading, finished);

    return h.response({ status: 'success', data: { books } });
  } catch (err) {
    console.error('Error while getting all books', err.message);
    return h.response({ status: 'fail', message: err.message }).code(err.statusCode || 500);
  }
}

const get = async (request, h) => {
  try {
    const book = await booksService.get(request.params.bookId);

    if (!book) {
      const error = new Error('Buku tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    return h.response({ status: 'success', data: { book } });
  } catch (err) {
    console.error('Error while getting a book', err.message);
    return h.response({ status: 'fail', message: err.message }).code(err.statusCode || 500);
  }
}

const update = async (request, h) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (!name) {
      const error = new Error('Gagal memperbarui buku. Mohon isi nama buku');
      error.statusCode = 400;
      throw error;
    }

    if (readPage > pageCount) {
      const error = new Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
      error.statusCode = 400;
      throw error;
    }

    const book = await booksService.get(request.params.bookId);

    if (!book) {
      const error = new Error('Gagal memperbarui buku. Id tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    await booksService.update(request.params.bookId, name, year, author, summary, publisher, pageCount, readPage, reading);

    return h.response({ status: 'success', message: 'Buku berhasil diperbarui' });
  } catch (err) {
    console.error('Error while updating a book', err.message);
    return h.response({ status: 'fail', message: err.message }).code(err.statusCode || 500);
  }
}

const remove = async (request, h) => {
  try {
    const book = await booksService.get(request.params.bookId);

    if (!book) {
      const error = new Error('Buku gagal dihapus. Id tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    await booksService.remove(request.params.bookId);

    return h.response({ status: 'success', message: 'Buku berhasil dihapus' });
  } catch (err) {
    console.error('Error while deleting a book', err.message);
    return h.response({ status: 'fail', message: err.message }).code(err.statusCode || 500);
  }
}

module.exports = {
  create,
  getAll,
  get,
  update,
  remove,
};
