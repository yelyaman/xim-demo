import service from './service.js';

export default {
  async getInfo(req, res) {
    try {
      const result = { id: req.user.id, username: req.user.username };
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async logout(req, res) {
    try {
      const result = await service.logout(req.user);

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async signin(req, res) {
    try {
      const { username, password } = req.body;

      const result = await service.signin(username, password);

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async newToken(req, res) {
    try {
      const { refreshToken } = req.body;

      const result = await service.newToken(refreshToken);

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async signup(req, res) {
    try {
      const { username, password } = req.body;
      const result = await service.signup(username, password);

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: err.message });
    }
  },
};
