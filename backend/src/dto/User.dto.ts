import {AutoMap} from '@automapper/classes';

export class UserDto {
  @AutoMap()
  public id!: string;

  @AutoMap()
  public username: string;

  public password: string;

  @AutoMap()
  public email: string;
}