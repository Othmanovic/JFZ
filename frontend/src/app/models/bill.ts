export interface Bill {
  _id: string;
  billNumber: string;
  receiver: string;
  goodsDescription: string;
  billAmount: number;
  shipId: number;
  createdAt?: string;
  status: 'Pending Review' | 'Accepted' | 'Denied'; // Status property
}
