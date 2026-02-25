const authService = require("../services/auth.service");

/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    console.log("here")
    const result = await authService.registerUser();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("X-User-Id", result.userId);
    res.setHeader("X-Temp-Token", result.tempToken);

    res.send(result.qrBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

/**
 * VERIFY
 */
exports.verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const { token } = req.body;

    if (!authHeader) {
      return res.status(401).json({ error: "JWT required" });
    }

    const jwtToken = authHeader.split(" ")[1];

    const authToken = await authService.verifyUser(jwtToken, token);

    res.json({
      message: "Verification successful",
      token: authToken
    });

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};