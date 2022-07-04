import { CreateUser, User } from '../entities/User.entity';
import { CreateUserDto, UserDto } from '../dto/User.dto';
import { mapper } from '../mapping/mapper';

export default class UserApi {
  private path = 'http://localhost:3001/api/user';

  public async get(): Promise<User[]> {
    const response = await fetch(this.path);
    const users = await response.json();
    return users.map((i: User) => mapper.map<UserDto, User>(i, 'UserDto', 'User'));
  }

  public async getById(id: string): Promise<User> {
    const response = await fetch(`${this.path}/${id}`);
    this.checkResponse(response);
    const user = await response.json();
    return mapper.map<UserDto, User>(user, 'UserDto', 'User');
  }

  public async add(user: CreateUser): Promise<User> {
    const method = 'POST';
    const response = await fetch(this.path, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(
        mapper.map<CreateUser, CreateUserDto>(user, 'CreateUser', 'CreateUserDto'),
      ),
    });
    this.checkResponse(response, method);
    const userDto = await response.json();
    return mapper.map<UserDto, User>(userDto, 'UserDto', 'User');
  }

  public async update(user: User): Promise<void> {
    const method = 'PUT';
    const response = await fetch(this.path, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(mapper.map<User, UserDto>(user, 'User', 'UserDto')),
    });
    this.checkResponse(response, method);
  }

  protected getHeaders = () => ({
    'Content-Type': 'application/json',
  });

  protected checkResponse = (res: Response, method = 'GET') => {
    if (!res.ok) {
      throw new Error(`Error ${method}: ${res}`);
    }
  };
}
