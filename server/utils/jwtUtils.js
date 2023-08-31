const jwt = require('jsonwebtoken');

const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(
    payload,
    process.env.SECRET_KEY,
    (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    },
  );
});

const generateLongLivedToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: '15d' }, // Set the expiration to a longer time, e.g., 30 days
    (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    },
  );
});

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) reject(new Error('Unauthorized'));
    else resolve(decoded);
  });
});

module.exports =  { generateToken, verifyToken, generateLongLivedToken };