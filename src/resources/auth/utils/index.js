import jwt from 'jsonwebtoken';

export default {
  generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
  },

  generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  },
};
