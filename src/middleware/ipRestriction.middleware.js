module.exports = function ipRestriction(req, res, next) {
  const ip = req.ip.replace("::ffff:", "");

  const allowedIps = process.env.ALLOWED_IPS.split(",");

  if (!allowedIps.includes(ip)) {
    return res.status(403).json({ error: "Access denied from this IP" });
  }

  next();
};