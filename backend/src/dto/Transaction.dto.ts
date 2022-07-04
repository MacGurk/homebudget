import {AutoMap} from '@automapper/classes';
import {UserDto} from './User.dto';

export class TransactionDto {
  @AutoMap()
  public id: string;

  @AutoMap()
  public date: Date;

  @AutoMap(() => UserDto)
  public User: UserDto;

  @AutoMap()
  public description: string;

  @AutoMap()
  public price: number;

  @AutoMap()
  public settled: boolean;
}