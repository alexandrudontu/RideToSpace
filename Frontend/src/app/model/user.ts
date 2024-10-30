export interface UserForRegister {
  userName: string;
  email: string;
  password: string;
}

export interface UserForLogin {
  email: string;
  password: string;
  token: string;
}
