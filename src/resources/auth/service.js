import User from '../../db/models/User.js';
import authUtils from './utils/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
  async logout(user) {
    const newAccessToken = authUtils.generateAccessToken({
      id: user.id,
      username: user.username,
    });

    return { newAccessToken };
  },

  async signin(username, password) {
    const user = await User.findOne({ where: { username } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = authUtils.generateAccessToken({ id: user.id, username: user.username });
      const refreshToken = authUtils.generateRefreshToken({ id: user.id, username: user.username });

      return { accessToken, refreshToken };
    } else {
      throw new Error('Invalid username or password.');
    }
  },

  async newToken(refreshToken) {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = authUtils.generateAccessToken({ id: user.id, username: user.username });

    return { accessToken };
  },

  async signup(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    const accessToken = authUtils.generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = authUtils.generateRefreshToken({ id: user.id, username: user.username });

    return { accessToken, refreshToken };
  },
};
