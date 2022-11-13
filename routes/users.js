var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var userService = require('./../services/userService');
var ageService = require('../services/dateService');

/* Login */
router.post('/login', function (req, res, next) {
  const p = userService.validateLogin(req);
  p.then((user) => {
    const age = ageService.getAge(user.birthdate);
    user.age = age;

    res.cookie('data', JSON.stringify(user), {
      secure: true,
      sameSite: 'none',
    });
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(err);
  });
});

/* Logout */
router.post('/logout', function (req, res, next) {
  if (req.cookies.data) {
    res.clearCookie('data', {
      secure: true,
      sameSite: 'none',
    });
    res.status(200).send();
  } else {
    res.status(401).send({ error: 'UNAUTHORIZED' });
  }
});

router.post('/createUser', (req, res, next) => {
  console.log('Prompted to create user');
  const p = userService.createUser(req);
  p.then((user) => {
    const age = ageService.getAge(user.birthdate);
    user.age = age;

    res.cookie('data', JSON.stringify(user), {
      secure: true,
      sameSite: 'none',
    });
    res.status(200).send(user);
  }).catch((err) => {
    if (err.code == 'ER_DUP_ENTRY') {
      res.status(400).send('Duplicate Email');
    }
    throw err;
    // res.status(500).send(err);
  });
});

module.exports = router;
