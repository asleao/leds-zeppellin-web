import http from "./httpService";

export function getTools() {
  return http.get("/tools/");
}
