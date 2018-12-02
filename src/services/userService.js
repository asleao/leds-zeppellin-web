import http from "./httpService";

const apiEndpoint = "/registration/";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password1: user.password,
    password2: user.password_confirmation
  });
}
