import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecretkey";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // save user id to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;