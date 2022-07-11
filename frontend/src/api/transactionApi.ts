import { mapper } from '../mapping/mapper';
import { Transaction } from '../entities/Transaction.entity';
import { TransactionDto } from '../dto/Transaction.dto';

export default class TransactionApi {
  private path = 'http://localhost:3001/api/transaction';

  public async get(): Promise<Transaction[]> {
    const response = await fetch(this.path);
    await this.checkResponse(response);
    const transaction = await response.json();
    // prettier-ignore
    return transaction.map((i: TransactionDto) => mapper.map<TransactionDto, Transaction>(
      i,
      'TransactionDto',
      'Transaction',
    ));
  }

  public async getById(id: string): Promise<Transaction> {
    const response = await fetch(`${this.path}/${id}`);
    await this.checkResponse(response);
    const user = await response.json();
    return mapper.map<TransactionDto, Transaction>(user, 'TransactionDto', 'Transaction');
  }

  public async getByMonthYear(month: number, year: number): Promise<Transaction[]> {
    const response = await fetch(`${this.path}/?month=${month}&year=${year}`);
    await this.checkResponse(response);
    const transaction = await response.json();
    // prettier-ignore
    return transaction.map((i: TransactionDto) => mapper.map<TransactionDto, Transaction>(
      i,
      'TransactionDto',
      'Transaction',
    ));
  }

  public async getYears(): Promise<number[]> {
    const response = await fetch(`${this.path}/years`);
    await this.checkResponse(response);
    return response.json();
  }

  public async add(transaction: Transaction): Promise<Transaction> {
    const method = 'POST';
    const response = await fetch(this.path, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(mapper.map<Transaction, TransactionDto>(transaction, 'Transaction', 'TransactionDto')),
    });
    await this.checkResponse(response, method);
    const transactionDto = await response.json();
    return mapper.map<TransactionDto, Transaction>(transactionDto, 'TransactionDto', 'Transaction');
  }

  public async delete(id: string): Promise<void> {
    const method = 'DELETE';
    const response = await fetch(`${this.path}/${id}`, { method });
    await this.checkResponse(response, method);
  }

  protected getHeaders = () => ({
    'Content-Type': 'application/json',
  });

  protected checkResponse = async (res: Response, method = 'GET') => {
    if (!res.ok) {
      const message = await res.json();
      throw new Error(`Failed to ${method} ressource: ${message.message}`);
    }
  };
}
