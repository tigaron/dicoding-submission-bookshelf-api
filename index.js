const Hapi = require('@hapi/hapi');
const booksController = require('./src/controllers/books.controller');

const server = Hapi.server({ port: process.env.PORT || 9000 });

server.route([
  {
    method: 'POST',
    path: '/books',
    handler: booksController.create,
  },
  {
    method: 'GET',
    path: '/books',
    handler: booksController.getAll,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: booksController.get,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: booksController.update,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: booksController.remove,
  },
]);

const startServer = async () => {
  try {
    await server.start();
    console.log(`Bookshelf API is listening at port ${server.info.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
