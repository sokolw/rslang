export default class SignInResponse {
  message: string;

  token: string;

  refreshToken: string;

  userId: string;

  name: string;

  constructor(message: string, token: string, refreshToken: string, userId: string, name: string) {
    this.message = message;
    this.token = token;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.name = name;
  }
}
