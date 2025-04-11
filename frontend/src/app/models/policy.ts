export interface Policy {
  id: string;
  billNumber: string;
  receiver: string;
  goodsDescription: string;
  containerNumber: string;
  weight: number;
  containerSize: string;
  goodsSize: string;
  cooling: boolean;
  isShared: boolean;
  shipmentType: string;
  serviceType: string;
  containerType: string;
  seaManagement: string; // ✅ Link to SeaManagement
  shipName: string; // ✅ Store shipName for display
  bill?: number;
}



export interface PoliciesResponse {
  policies: Policy[];
}
