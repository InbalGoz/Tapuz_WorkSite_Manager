export interface User {
  id: Number;
  username: string;
  password_hash: string;
  full_name: string;
  email: string;
  createdAt: Date;
}

export interface loginData {
  username: string;
  password: string;
}
