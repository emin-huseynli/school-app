
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user"
}

export interface IAuthContext {
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
}

export interface ILogin {
  email: string;
  password: string;
}
