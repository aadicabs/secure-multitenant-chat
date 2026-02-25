const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later."
});