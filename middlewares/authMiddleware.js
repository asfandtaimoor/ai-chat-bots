import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate user requests using Bearer token
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 */
const authenticateUser = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Get the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateUser;
