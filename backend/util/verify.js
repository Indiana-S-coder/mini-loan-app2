const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.TOKEN_KEY || "iuhadfjk";

exports.createToken = (payload) => {
  return jwt.sign(payload.toJSON(), secretKey, { expiresIn: "5h" });
};

exports.verifyLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ err: "Login expired!/nPlease login again!" });
  }
};