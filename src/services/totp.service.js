const speakeasy = require("speakeasy");

function generateSecret(userId) {
  return speakeasy.generateSecret({
    length: 20,
    name: `SecureChat:${userId}`
  });
}

function verifyToken(secret, token) {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1
  });
}

module.exports = {
  generateSecret,
  verifyToken
};