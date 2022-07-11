import Transaction from '../models/Transaction';
import User from '../models/User';
import { Op } from 'sequelize';

export default class TransactionRepository {
  static async findAll(): Promise<Transaction[]> {
    return await Transaction.findAll({ include: { model: User, as: 'user' } });
  }

  static async findById(id: string): Promise<Transaction> {
    return await Transaction.findOne({ where: { id }, include: { model: User, as: 'user' } });
  }

  static async findByMonthYear(month: number, year: number): Promise<Transaction[]> {
    const startDate = new Date(year, month);
    const endDate = new Date(startDate).setMonth(startDate.getMonth() + 1);

    return await Transaction.findAll({
      where: {
        date: {
          [Op.gt]: startDate,
          [Op.lt]: endDate,
        },
      },
      include: { model: User, as: 'user' },
    });
  }

  static async getYears(): Promise<number[]> {
    const years: number[] = [];
    const transactions = await Transaction.findAll();
    transactions.forEach((transaction) => {
      const year = transaction.date.getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
    });
    years.sort();
    return years;
  }

  static async create(
    date: Date,
    description: string,
    price: number,
    userId: string,
    settled: boolean,
  ): Promise<Transaction> {
    const transaction = await Transaction.create({
      date: date,
      description: description,
      price: price,
      UserId: userId,
      settled: settled,
    });
    return await this.findById(transaction.id);
  }

  static async deleteById(id: string): Promise<number> {
    return await Transaction.destroy({ where: { id } });
  }

  static async update(
    id: string,
    date: Date,
    description: string,
    price: number,
    userId: string,
  ): Promise<Transaction> {
    await Transaction.update(
      {
        date: date,
        description: description,
        price: price,
        UserId: userId,
      },
      { where: { id } },
    );
    return await this.findById(id);
  }
}
