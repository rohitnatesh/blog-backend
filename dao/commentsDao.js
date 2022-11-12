const defaultDao = require("../dao/defaultDao");

let getCommentsForArticle = function (articleId) {
  const commentsArtPromise = new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    let comments = [];
    connection.connect();
    let sql = "SELECT * FROM comment natural join people WHERE aid = ?";

    connection.query(sql, [articleId], (err, rows, fields) => {
      if (err) {
        console.log("Error encountered when getting comments!!!!");
        reject(err);
      }

      if (rows) {
        rows.forEach((comm) => {
          let currentComment = {
            id: comm.cid,
            content: comm.ccontent,
            commentTime: comm.comment_time,
            username: comm.uname,
          };
          comments.push(currentComment);
        });
        resolve(comments);
      }
      console.log("Closing connection...");
      connection.end();
    });
  });
  return commentsArtPromise;
};

module.exports = {
  getCommentsForArticle: getCommentsForArticle,
};
