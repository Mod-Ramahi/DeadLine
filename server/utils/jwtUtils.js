const jwt = require('jsonwebtoken');

const generateToken = (payload) => new Promise((resolve, reject) => {
 const generatePayload ={...payload,
  exp: Math.floor(Date.now() / 1000) + 10800,
}
  jwt.sign(
    generatePayload,
    process.env.SECRET_KEY,
    // { expiresIn: '2d' },
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
  const expirationTimeInSeconds = 15 * 24 * 60 * 60;
  jwt.sign(
    {...payload,
      exp: Math.floor(Date.now() / 1000) + expirationTimeInSeconds,
    },
    process.env.SECRET_KEY,
    // { expiresIn: '15d' }, 
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