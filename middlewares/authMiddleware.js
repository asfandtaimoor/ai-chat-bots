import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate user requests
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 */
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authenticate;
