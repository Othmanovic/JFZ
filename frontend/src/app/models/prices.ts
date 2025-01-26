export interface Price {
  shipmentType: string; // Same as in Policy model
  containerType: string; // Same as in Policy model
  containerSize: number; // Use number type for easy comparison
  pricePerContainer: number;
  calculationMethod: 'amount' | 'volume'; // Dropdown selection
  volume?: number; // Optional, only needed for 'volume'
}
