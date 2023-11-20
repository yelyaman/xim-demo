import service from './service.js';
import contentDisposition from 'content-disposition';

export default {
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const file = await service.getOne(id, true);

      return res.status(200).send(file);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async download(req, res) {
    try {
      const { id } = req.params;
      const file = await service.getOne(id);
      console.log(file);
      res.set({
        'Content-Type': file.mimetype,
        'Content-Transfer-Encoding': 'binary',
        'Content-Disposition': contentDisposition(file.originalname),
      });

      return res.status(200).send(file.buffer);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async getList(req, res) {
    try {
      const { list_size = 10, page = 1 } = req.query;

      const files = await service.getList(list_size, page);
      return res.status(200).send(files);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async upload(req, res) {
    try {
      const files = req.files;
      const result = await service.upload(files);

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const newFile = req.file;
      const updatedFile = await service.update(id, newFile);

      return res.status(200).send(updatedFile);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      await service.delete(id);

      return res.status(200).send({ msg: 'successed' });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
