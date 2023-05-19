import { Client, ClientStatus } from "../model/Client";

export const initialClients: Client[] = [
  {
    id: 1,
    name: "Frank Miller",
    dateOfBirth: "1987-12-30",
    email: "frank@example.com",
    status: ClientStatus.ACTIVE,
  },
  {
    id: 2,
    name: "David Davis",
    dateOfBirth: "1985-05-15",
    email: "david@example.com",
    status: ClientStatus.PENDING,
  },
  {
    id: 3,
    name: "Charlie Brown",
    dateOfBirth: "1978-11-30",
    email: "charlie@example.com",
    status: ClientStatus.BLOCKED,
  },
];
