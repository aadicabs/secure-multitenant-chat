const db = require("../db/database");

function createUser(userId, secret) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (id, totp_secret) VALUES (?, ?)",
      [userId, secret],
      function (err) {
        if (err) return reject(err);
        resolve({ id: userId });
      }
    );
  });
}

function findUserById(userId) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

module.exports = {
  createUser,
  findUserById
};