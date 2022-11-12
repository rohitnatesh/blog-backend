const mysql = require("mysql");

let getDatabaseConnection = function () {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project",
  });
  return connection;
};

module.exports = {
  getDatabaseConnection: getDatabaseConnection,
};
