export interface UserDto {
  id: string;
  username: string;
  email: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}
export interface UpdateUserDto {
  username: string;
  email: string;
}

export interface UpdatePasswordDto {
  password: string;
}
