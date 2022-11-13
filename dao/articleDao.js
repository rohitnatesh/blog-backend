const defaultDao = require('../dao/defaultDao');
const dateService = require('../services/dateService');

let getUserArticles = function (user) {
  const userArtPromise = new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    let articles = [];
    let sql =
      'select aid, title, uname, publish_time, catid, cname from article natural join people natural join category ORDER BY publish_time DESC';

    connection.query(sql, [user.id], (err, rows, fields) => {
      if (err) {
        console.log('Error encounter when getting Articles!!!!');
        reject(err);
      }

      if (rows) {
        rows.forEach((art) => {
          let article = {
            id: art.aid,
            title: art.title,
            username: art.uname,
            publishTime: art.publish_time,
            category: { id: art.catid, name: art.cname },
          };
          articles.push(article);
        });
        resolve(articles);
        console.log('Closing connection...');
        connection.end();
      } else {
        console.log('Closing connection...');
        connection.end();
      }
    });
  });
  return userArtPromise;
};

let getArticle = function (articleId, user) {
  const articlePromise = new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    let sql =
      'select * from article natural join people natural join category where article.aid = ? ORDER BY publish_time DESC';
    let article = {};
    connection.query(sql, [articleId], (err, rows, fields) => {
      if (err) {
        console.log('Error encounter when getting Article!!!!');
        reject(err);
      }

      if (rows) {
        rows.forEach((art) => {
          article = {
            id: art.aid,
            title: art.title,
            username: art.uname,
            content: art.acontent,
            category: {
              name: art.cname,
              id: art.catid,
            },
            publishTime: art.publish_time,
            minimumAge: art.min_age,
          };
        });
        resolve(article);
        console.log('Closing connection...');
        connection.end();
      } else {
        console.log('Closing connection...');
        connection.end();
      }
    });
  });
  return articlePromise;
};

let createArticle = function (req, user) {
  return new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    const sql = 'INSERT INTO article values (NULL, ?, ?, ?, ?, ?)';
    connection.query(
      sql,
      [
        req.body.title,
        user.id,
        req.body.content,
        dateService.getCurrentDatetime(),
        req.body.categoryId,
      ],
      (err, result) => {
        if (err) {
          console.log('Error encounter when creating Article!!!!');
          reject(err);
        }

        if (result) {
          let articleId = result.insertId;
          resolve(articleId);
        }

        console.log('Closing connection...');
        connection.end();
      }
    );
  });
};

let createComment = function (req, user) {
  return new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    let sql = 'INSERT into comment values (NULL, ?, ?, ?, ?)';
    const commentTime = dateService.getCurrentDatetime();
    connection.query(
      sql,
      [user.id, req.body.articleId, req.body.content, commentTime],
      (err, result) => {
        if (err) {
          console.log('Error encounter when creating Comment!!!!');
          reject(err);
        }

        if (result) {
          let commentId = result.insertId;
          resolve({
            id: commentId,
            content: req.body.content,
            commentTime,
            username: user.username,
          });
        }
        console.log('Closing connection...');
        connection.end();
      }
    );
  });
};

let getArticlesByCategory = function (categoryId, user) {
  return new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    let articles = [];
    let sql =
      'SELECT * FROM article natural join people natural join category where catid = ?';
    connection.query(sql, [categoryId], (err, rows) => {
      if (err) {
        console.log('Error encounter when creating Comment!!!!');
        reject(err);
      }

      if (rows) {
        rows.forEach((art) => {
          let article = {
            id: art.aid,
            title: art.title,
            username: art.uname,
            publishTime: art.publish_time,
            category: { id: art.catid, name: art.cname },
          };
          articles.push(article);
        });
        resolve(articles);
        console.log('Closing connection...');
        connection.end();
      } else {
        console.log('Closing connection...');
        connection.end();
      }
    });
  });
};

module.exports = {
  getUserArticles: getUserArticles,
  getArticle: getArticle,
  createArticle: createArticle,
  createComment: createComment,
  getArticlesByCategory: getArticlesByCategory,
};
