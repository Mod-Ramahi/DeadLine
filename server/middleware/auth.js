const { verifyToken } = require('../utils/jwtUtils');


const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.body.headers.Authorization;
    // console.log(req.body.headers.authorization,4)
    // const authorizationHeader = req.headers.Authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  // const token = authorizationHeader.split(' ')[1];


  try {
    // Verify the token
    const decoded = await verifyToken(token)
    req.user = decoded; // Store the decoded user information in the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
