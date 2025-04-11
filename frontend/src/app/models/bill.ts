export interface Bill {
  _id?: string;
  billNumber: string;
  receiver: string;
  goodsDescription: string;
  containerNumber: string;
  weight: number;
  containerSize: string;
  goodsSize: string;
  cooling: string;
  isShared: boolean;
  shipmentType: string;
  serviceType: string;
  containerType: string;
  billAmount: number;
  shipId: string;
  shipName: string;
  owner: string;
  shippingPort: string;
  totalWeight: number;
  netWeight: number;
  arrivalDate: string;
  captainName: string;
  createdAt?: string;
  status: 'Pending Review' | 'Accepted' | 'Denied';

  // 🆕 Added fields
  bayanNumber?: number;
  bayanYear?: number;
  // policyNumber?: string;
}
