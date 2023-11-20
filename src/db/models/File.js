import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          primaryKey: true,
        },
        originalname: Sequelize.STRING,
        encoding: Sequelize.STRING,
        mimetype: Sequelize.STRING,
        buffer: Sequelize.BLOB('long'),
        size: Sequelize.BIGINT,
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        underscored: true,
      },
    );

    return this;
  }
}

export default File;
