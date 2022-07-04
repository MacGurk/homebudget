import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import User from './User';
import {AutoMap} from '@automapper/classes';

export default class Transaction extends Model {
  @AutoMap()
  declare id: string;

  @AutoMap()
  declare date: Date;

  @AutoMap(() => User)
  declare User: User;

  @AutoMap()
  declare description: string;

  @AutoMap()
  declare price: number;

  @AutoMap()
  declare settled: boolean;

  static _init(sequelize: Sequelize): void {
    Transaction.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        settled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Transaction',
      },
    );
  }
}
