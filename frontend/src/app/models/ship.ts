import { Policy } from "./policy";

export interface Ship {
  shipName: string;
  owner: string;
  flag: string;
  captainName: string;
  maxDive: number;
  shippingPort?: string;
  shipNumber?: string;
  bayanNumber?: string;
  policies?: Policy[];
  startWorkingDate?: Date; // Optional field for start working date
}