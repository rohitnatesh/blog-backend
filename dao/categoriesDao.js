const defaultDao = require('./defaultDao');

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    const query = 'SELECT catid, cname FROM category';

    connection.query(query, (err, rows) => {
      if (err) {
        console.log('Error encounter while getting the categories.');
        reject(err);
      }

      resolve(rows ?? []);
      console.log('Closing connection...');
      connection.end();
    });
  });
};

module.exports = {
  getCategories,
};
