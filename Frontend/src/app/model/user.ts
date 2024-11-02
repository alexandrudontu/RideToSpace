export interface UserForRegister {
  userName: string;
  email: string;
  password: string;
}

export interface UserForLogin {
  userName: string;
  email: string;
  password: string;
  token: string;
  role: string;
}

export interface UserForInfo {
  userName: string;
  email: string;
}
