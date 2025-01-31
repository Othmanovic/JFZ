export interface Price {
  shipmentType: string; // Same as in Policy model
  containerType: string; // Same as in Policy model
  containerSize: number; // Use number type for easy comparison
  pricePerContainer: number;
  weight?: number;
  calculationMethod: 'amount' | 'volume' | 'pouring'; // Dropdown selection
  volume?: number; // Optional, only needed for 'volume'
}
