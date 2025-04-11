export interface Price {
  shipmentType: string;
  serviceType: string;
  containerType: string;
  containerSize?: number;
  weight?: number;
  calculationMethod: 'amount' | 'volume' | 'pouring';
  volume?: number;
  pricePerContainer: number;
  applyDiscount?: boolean;
  discountPercentage?: number;
  discountedPrice?: number;
}
