import express from 'express';
import controller from './controller.js';
import middlewares from '../../middlewares/index.js';

const router = express.Router();

router.get('/info', middlewares.authMiddleware, controller.getInfo);
router.get('/logout', middlewares.authMiddleware, controller.logout);
router.post('/signin', controller.signin);
router.post('/signin/new_token', controller.newToken);
router.post('/signup', controller.signup);

export default router;
