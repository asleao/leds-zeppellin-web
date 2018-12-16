import http from "./httpService";

export function getLanguages() {
  return http.get("/languages/");
}
