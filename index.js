import dotenv from 'dotenv';
import express from 'express';
import middlewares from './src/middlewares/index.js';
import authorization from './src/resources/auth/router.js';
import files from './src/resources/files/router.js';
import db from './src/db/index.js';
dotenv.config();

try {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(middlewares.cors);

  db.init();

  app.use('/auth', authorization);
  app.use('/file', files);

  app.listen(process.env.PORT, () =>
    console.log(`Express app running on port ${process.env.PORT}!`),
  );
} catch (error) {
  console.log(error);
  process.exit(1);
}
