export enum ClientStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  BLOCKED = "BLOCKED",
}

export interface Client {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  status: ClientStatus;
}
