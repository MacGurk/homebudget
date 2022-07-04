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

export interface UpdateUser {
  username: string;
  email: string;
}

export interface UpdatePassword {
  password: string;
}
