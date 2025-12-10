export class RegisterUserRequest {
  username: string;
  name: string;
  email: string;
  notlp: string;
  tipe_user: string;
  password_hash: string;
}

export class UserResponse {
  id_user?: number;  
  username: string;
  name: string;
  email?: string;
  notlp?: string;
  tipe_user?: string;
  token?: string | null;
}

export class LoginUserRequest {
  username: string;
  password_hash: string; 
}

export class UpdateUserRequest {
  name?: string;
  email?: string;
  notlp?: string;
  password_hash?: string; 
}

