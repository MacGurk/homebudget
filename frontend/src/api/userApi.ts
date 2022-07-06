import { CreateUser, UpdatePassword, User } from '../entities/User.entity';
import { CreateUserDto, UpdatePasswordDto, UserDto } from '../dto/User.dto';
import { mapper } from '../mapping/mapper';

export default class UserApi {
  private path = 'http://localhost:3001/api/user';

  public async get(): Promise<User[]> {
    const response = await fetch(this.path);
    await this.checkResponse(response);
    const users = await response.json();
    return users.map((i: User) => mapper.map<UserDto, User>(i, 'UserDto', 'User'));
  }

  public async getById(id: string): Promise<User> {
    const response = await fetch(`${this.path}/${id}`);
    await this.checkResponse(response);
    const user = await response.json();
    return mapper.map<UserDto, User>(user, 'UserDto', 'User');
  }

  public async add(user: CreateUser): Promise<User> {
    const method = 'POST';
    const response = await fetch(this.path, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(mapper.map<CreateUser, CreateUserDto>(user, 'CreateUser', 'CreateUserDto')),
    });
    await this.checkResponse(response, method);
    const userDto = await response.json();
    return mapper.map<UserDto, User>(userDto, 'UserDto', 'User');
  }

  public async update(user: User): Promise<void> {
    const method = 'PUT';
    const response = await fetch(`${this.path}/${user.id}`, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(mapper.map<User, UserDto>(user, 'User', 'UserDto')),
    });
    await this.checkResponse(response, method);
  }

  public async updatePassword(updatedPassword: UpdatePassword): Promise<void> {
    const method = 'PUT';
    const response = await fetch(`${this.path}/${updatedPassword.id}/updatePassword`, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(
        mapper.map<UpdatePassword, UpdatePasswordDto>(updatedPassword, 'UpdatePassword', 'UpdatePasswordDto'),
      ),
    });
    await this.checkResponse(response, method);
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
