export interface User {
  id: number;
  username: string;
  password_hash: string;
  full_name: string;
  email: string;
  createdAt: Date;
}
