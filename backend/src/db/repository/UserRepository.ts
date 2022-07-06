import User from '../models/User';
import { Op, where } from 'sequelize';
import Auth from '../../service/Auth';

export default class UserRepository {
  static async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  static async findById(id: string): Promise<User> {
    return await User.findOne({
      where: { id },
    });
  }

  static async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    return await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
  }

  static async findByUsername(username: string): Promise<User> {
    return await User.findOne({
      where: { username: username },
    });
  }

  static async findByEmail(email: string): Promise<User> {
    return await User.findOne({
      where: { email: email },
    });
  }

  static async existsByUsername(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null && user instanceof User;
  }

  static async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null && user instanceof User;
  }

  static async create(username: string, email: string, password: string): Promise<User> {
    return await User.create({ username, email, password: Auth.hashPassword(password) });
  }

  static async updateUser(id: string, username: string, email: string): Promise<number> {
    const affected = await User.update(
      {
        username: username,
        email: email,
      },
      {
        where: { id },
      },
    );

    return affected[0];
  }

  static async updatePassword(id: string, password: string): Promise<[affectedCount: number]> {
    return await User.update({ password: Auth.hashPassword(password) }, { where: { id } });
  }

  static async delete(id: string): Promise<number> {
    return await User.destroy({ where: { id } });
  }
}
