import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/login/";
const tokenKey = "token";
const refreshKey = "refresh";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt.access);
  localStorage.setItem(refreshKey, jwt.refresh);
}

export async function loginRefresh(refresh) {
  const { data: jwt } = await http.post(apiEndpoint + "refresh/", {
    refresh
  });
  localStorage.setItem(tokenKey, jwt.access);
  http.setJwt(getJwt());
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getJwtRefresh() {
  return localStorage.getItem(refreshKey);
}
export default {
  login,
  loginRefresh,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getJwtRefresh
};
