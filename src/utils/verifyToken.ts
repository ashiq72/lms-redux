import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string): boolean => {
  return jwtDecode(token);
};
