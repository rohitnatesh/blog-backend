const express = require('express');
var router = express.Router();

const categoriesDao = require('../dao/categoriesDao');

router.get('/', (req, res) => {
  console.log('categories');
  if (req.cookies.data) {
    categoriesDao
      .getCategories()
      .then((categories) => {
        res.status(200).send(categories);
      })
      .catch((error) => {
        res.status(400).send({ error: 'INTERNALERROR' });
      });
  } else {
    res.status(401).send({ error: 'UNAUTHORIZED' });
  }
});

module.exports = router;
