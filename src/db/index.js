import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelPath = 'models\\';
const modelFiles = fs
  .readdirSync(__dirname + `\\${modelPath}`)
  .filter((file) => file.endsWith('.js'));

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize(databaseConfig);

      /*
        Loading models automatically
      */

      for (const file of modelFiles) {
        const model = await import(`./${modelPath.replace(/\\/g, '/')}${file}`);
        model.default.init(connection);
      }

      modelFiles.map(async (file) => {
        const model = await import(`./${modelPath}${file}`.replace(/\\/g, '/'));
        model.default.associate && model.default.associate(connection.models);
      });

      // await connection.sync({ alter: true });

      console.log('[SEQUELIZE] Database service initialized');
    } catch (error) {
      console.log('[SEQUELIZE] Error during database service initialization');
      throw error;
    }
  },
};

export default sequelizeService;
