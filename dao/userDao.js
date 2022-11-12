var express = require("express");
const defaultDao = require("../dao/defaultDao");

let getCredentials = function (req) {
  const credPromise = new Promise((reslv, rejct) => {
    const connection = defaultDao.getDatabaseConnection();
    let users = [];
    console.log("body:" + req.body.email);
    connection.connect();
    let sql =
      "SELECT uid, email from credential where BINARY email = ? and BINARY password = ?";

    connection.query(
      sql,
      [req.body.email, req.body.password],
      (err, rows, fields) => {
        console.log(sql, [req.body.email, req.body.password]);
        if (err) {
          console.log("Error encountered!!!!");
          rejct(err);
        }

        if (rows) {
          rows.forEach((user) => {
            let currentUser = { id: user.uid, email: user.email };
            users.push(currentUser);
          });
          reslv(users);
        }
        console.log("Closing connection...");
        connection.end();
      }
    );
  });
  return credPromise;
};

let getUser = function (id) {
  const userPromise = new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    connection.connect();
    let sql =
      "SELECT uid, uname, birthdate, gender, email from people natural join credential where uid = ?";
    connection.query(sql, [id], (err, rows, fields) => {
      if (err) {
        console.log("Error encountered!!!!");
        reject(err);
      }
      if (rows) {
        let user = rows[0];
        let userProfile = {
          id: user.uid,
          email: user.email,
          username: user.uname,
          birthdate: user.birthdate,
          gender: user.gender,
        };
        console.log("CurUser:" + JSON.stringify(userProfile));
        console.log("Closing connection...");
        connection.end();
        resolve(userProfile);
      } else {
        console.log("Closing connection...");
        connection.end();
      }
    });
  });
  return userPromise;
};

let createPerson = function (req) {
  return new Promise((resolve, reject) => {
    const connection = defaultDao.getDatabaseConnection();
    connection.connect();
    let sql1 = "insert into people values (NULL, ?, ?, ?)";
    connection.query(
      sql1,
      [req.body.username, req.body.birthdate, req.body.gender],
      (err, result) => {
        if (err) {
          console.log("Error enouncter when creating User!!!!");
          reject(err);
        }

        if (result) {
          console.log(JSON.stringify(result));

          let insertId = result.insertId;

          console.log("created people with userID" + insertId);
          // reuse the same connection
          let credPromise = createCredential(connection, req, insertId);

          credPromise
            .then((credentialUserId) => {
              console.log("Completed creating user: " + credentialUserId);
              resolve(credentialUserId);
            })
            .catch((err) => {
              // TODO: something failed here. Handle this later
              reject(err);
            })
            .finally(() => {
              console.log("Closing connection...");
              connection.end();
            });
        } else {
          console.log("Closing connection...");
          connection.end();
        }
      }
    );
  });
};

let createCredential = function (connection, req, userId) {
  return new Promise((resolve, reject) => {
    let sql2 = "insert into credential values (?, ?, ?, ?, ?)";
    connection.query(
      sql2,
      [
        userId,
        req.body.email,
        req.body.password,
        req.body.securityQuestion,
        req.body.securityAnswer,
      ],
      (err, result) => {
        if (err) {
          console.log("Error enountered when creating credential!!!!");
          reject(err);
        }

        if (result) {
          console.log("Completed inserting credential");
          console.log(JSON.stringify(result));
          resolve(userId);
        }
      }
    );
  });
};

module.exports = {
  getCredentials: getCredentials,
  getUser: getUser,
  createPerson: createPerson,
};
