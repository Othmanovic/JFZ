import { Policy } from "./policy";

export interface Ship {
  _id?: string;
  shipName: string;
  owner: string;
  flag: string;
  captainName: string;
  maxDive: number;
  shippingPort?: string;
  shipNumber?: string;
  policies?: Policy[];
  startWorkingDate?: Date; // Optional field for start working date
}