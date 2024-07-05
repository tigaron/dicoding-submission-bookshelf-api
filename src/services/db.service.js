const db = new Map();

const set = (key, value) => {
  db.set(key, value);
};

const get = (key) => db.get(key);

const getAll = () => [...db.values()];

const remove = (key) => {
  db.delete(key);
};

module.exports = {
  set,
  get,
  getAll,
  remove,
};
