export interface User {
  id: string;
  username: string;
  email: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface UpdatePassword {
  id: string;
  password: string;
}
