const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt.config");

function generateTempToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "10m" });
}

function generateAuthToken(userId) {
  return jwt.sign(
    { userId, role: "authenticated" },
    jwtSecret,
    { expiresIn: "1000000000000000m" }
  );
}

function verifyJWT(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  generateTempToken,
  generateAuthToken,
  verifyJWT
};