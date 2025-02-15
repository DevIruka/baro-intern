import { Database } from "./database.types";

// Supabase users 테이블의 Row 타입을 가져옵니다
type DbUser = Database["public"]["Tables"]["users"]["Row"];

export type User = DbUser;

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  email: string;
  password: string;
  nickname: string;
  numberPart: string; 
  letterPart: string;
};
