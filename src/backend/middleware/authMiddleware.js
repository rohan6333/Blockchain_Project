const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authorize = (roles) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Forbidden. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if user role is authorized
    if (Array.isArray(roles)) {
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden. Invalid role.' });
      }
    } else if (roles !== decoded.role) {
      return res.status(403).json({ message: 'Forbidden. Invalid role.' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(403).json({ message: 'Forbidden. Invalid or expired token.' });
  }
};
