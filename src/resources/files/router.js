import express from 'express';
import controller from './controller.js';
import middlewares from '../../middlewares/index.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/list', middlewares.authMiddleware, controller.getList);
router.get('/:id', middlewares.authMiddleware, controller.getOne);
router.get('/download/:id', middlewares.authMiddleware, controller.download);
router.post('/upload', middlewares.authMiddleware, upload.array('files'), controller.upload);
router.put('/update/:id', middlewares.authMiddleware, upload.single('file'), controller.update);
router.delete('/delete/:id', middlewares.authMiddleware, controller.delete);

export default router;
