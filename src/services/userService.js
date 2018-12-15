import http from "./httpService";

const apiEndpoint = "/users/";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password,
    password2: user.password_confirmation
  });
}
