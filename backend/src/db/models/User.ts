import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import {AutoMap} from '@automapper/classes';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @AutoMap()
  declare id: string;

  @AutoMap()
  declare username: string;

  declare password: string;

  @AutoMap()
  declare email: string;

  static _init(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }
}
