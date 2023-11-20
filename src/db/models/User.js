import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          primaryKey: true,
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
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

export default User;
