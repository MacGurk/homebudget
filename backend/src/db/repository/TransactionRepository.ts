import Transaction from '../models/Transaction';
import User from '../models/User';

export default class TransactionRepository {
  static async findAll(): Promise<Transaction[]> {
    return await Transaction.findAll();
  }

  static async findById(id: string): Promise<Transaction> {
    return await Transaction.findOne({ where: { id }, include: [User] });
  }

  static async create(date: Date, description: string, price: number, userId: string): Promise<Transaction> {
    const transaction = await Transaction.create({
      date: date,
      description: description,
      price: price,
      UserId: userId,
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
