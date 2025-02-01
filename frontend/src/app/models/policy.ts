export interface Policy {
  id: string; // The ObjectId from MongoDB, mapped as a string in TypeScript
  billNumber: string;
  receiver: string;
  goodsDescription: string;
  containerNumber: string;
  weight: number;
  containerSize: string; // Keep as string if it's entered as text
  goodsSize: string;
  cooling: string;
  isShared: boolean;
  shipmentType: string; // Matches the `shipmentType` in Price model
  serviceType: string; // Matches the `shipmentType` in Price model
  containerType: string; // Add this field if needed for price calculation
  ship: string; // Ship's ObjectId
  bill?: number; // Optional field for calculated bill
}

export interface PoliciesResponse {
  policies: Policy[];
}
