export interface User {
  id: number;
  username: string;
  password: string;
  full_name: string;
  email: string;
  createdAt: Date;
}

export interface loginData {
  username: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
