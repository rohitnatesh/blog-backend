var express = require('express');
var router = express.Router();
var articleService = require('./../services/articleService');

router.post('/', (req, res, next) => {
  if (req.cookies.data) {
    const userData = JSON.parse(req.cookies.data);
    const p = articleService.commentOnArticle(req, userData);
    p.then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      throw err;
      // res.status(500).send(err);
    });
  } else {
    res.status(401).send({ error: 'UNAUTHORIZED' });
  }
});

module.exports = router;
