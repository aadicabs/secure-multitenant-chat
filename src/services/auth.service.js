const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

const userRepository = require("../repositories/user.repository");
const totpService = require("./totp.service");
const tokenService = require("./token.service");

async function registerUser() {
  const userId = uuidv4();

  const secretObj = totpService.generateSecret(userId);

  await userRepository.createUser(userId, secretObj.base32);

  const qrBuffer = await QRCode.toBuffer(secretObj.otpauth_url);

  const tempToken = tokenService.generateTempToken(userId);

  return {
    userId,
    qrBuffer,
    tempToken
  };
}

async function verifyUser(jwtToken, otpToken) {
  const decoded = tokenService.verifyJWT(jwtToken);
  const user = await userRepository.findUserById(decoded.userId);

  if (!user) throw new Error("User not found");

  const isValid = totpService.verifyToken(user.totp_secret, otpToken);

  if (!isValid) throw new Error("Invalid OTP");

  const authToken = tokenService.generateAuthToken(user.id);

  return authToken;
}

module.exports = {
  registerUser,
  verifyUser
};