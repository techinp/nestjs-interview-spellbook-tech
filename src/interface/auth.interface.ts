export interface IJWTPayload {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}
