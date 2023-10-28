import { api } from "../lib/api";

interface LoginPayload {
  username: string;
  password: string;
}
export class AuthService {
  static async login(payload: LoginPayload) {
    return api
      .post("/v1/authentication/login", payload)
      .then((res) => res.data);
  }
}
