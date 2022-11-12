var articleDao = require('./../dao/articleDao');
var commentsDao = require('./../dao/commentsDao');

let getUserArticles = function (user) {
  return new Promise((resolve, reject) => {
    const articlePromise = articleDao.getUserArticles(user);
    articlePromise.then(function (articles) {
      resolve(articles);
    });
  });
};

let getArticle = function (articleId, user) {
  return new Promise((resolve, reject) => {
    const articlePromise = articleDao.getArticle(articleId, user);
    articlePromise
      .then((article) => {
        const commentPromise = commentsDao.getCommentsForArticle(article.id);
        commentPromise
          .then((comments) => {
            article.comments = comments;
            resolve(article);
          })
          .catch((err) => {
            resolve(article);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let createArticle = function (req, user) {
  return new Promise((resolve, reject) => {
    const articlePromise = articleDao.createArticle(req, user);
    articlePromise
      .then((articleId) => {
        resolve(articleId);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let commentOnArticle = function (req, user) {
  return new Promise((resolve, reject) => {
    const articlePromise = articleDao.createComment(req, user);
    articlePromise
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let searchByCategory = function (categoryId, user) {
  return new Promise((resolve, reject) => {
    const articlePromise = articleDao.getArticlesByCategory(categoryId, user);
    articlePromise
      .then((catArticles) => {
        resolve(catArticles);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getUserArticles: getUserArticles,
  getArticle: getArticle,
  createArticle: createArticle,
  commentOnArticle: commentOnArticle,
  searchByCategory: searchByCategory,
};
