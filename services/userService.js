var userDao = require('../dao/userDao');

let validateLogin = function (req) {
  return new Promise((res, rej) => {
    const credPromise = userDao.getCredentials(req);
    credPromise.then((users) => {
      if (users.length == 1) {
        const userPromise = userDao.getUser(users[0].id);
        userPromise.then((userProfile) => {
          console.log('Userss:' + JSON.stringify(userProfile));
          res(userProfile);
        });
      } else {
        rej({ error: 'USERNOTFOUND' });
      }
    });
  });
};

let createUser = function (req) {
  return new Promise((resolve, reject) => {
    console.log('Creating user in service');
    const userPromise = userDao.createPerson(req);
    userPromise
      .then((userId) => {
        const userPromise = userDao.getUser(userId);
        userPromise.then((userProfile) => {
          resolve(userProfile);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  validateLogin: validateLogin,
  createUser: createUser,
};
