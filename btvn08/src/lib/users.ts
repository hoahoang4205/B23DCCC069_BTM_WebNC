export type Role = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
}

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Quản Trị Viên",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
  {
    id: "2",
    name: "Khách Hàng",
    email: "user@test.com",
    password: "123456",
    role: "user",
  },
];
