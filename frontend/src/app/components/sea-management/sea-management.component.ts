import { Component, OnInit } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';
import { Ship } from '../../models/ship';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sea-management',
  templateUrl: './sea-management.component.html',
  styleUrls: ['./sea-management.component.scss']
})

export class SeaManagementComponent implements OnInit {
  ships: Ship[] = [];
  selectedShip: Ship | null = null;
  selectedShipId: string = ''
  selectedShipName: string = '';
  shipId: string = '';
  
  // Form fields
  shipName: string = '';
  owner: string = '';
  wakeel: string = '';
  callSign: string = '';
  captainName: string = '';
  flag: string = '';
  totalWeight: number = 0;
  netWeight: number = 0;
  maxDive: number = 0;
  // Other form fields (not related to ship selection)
  // agent: string = '';
  crewNumber: number = 0;
  crewNationality: string = '';
  shipmentType: string = '';
  shippingPort: string = '';
  comingFrom: string = '';
  travelingTo: string = '';
  shipmentDetails: string = '';
  shipmentWeight: number = 0;
  transitShipment: string = '';
  arrivalDate: string = '';
  notes: string = '';

  formSubmitted: boolean = false;
  errorMessage: string | null = null;

  constructor(private seaManagementService: SeaManagementService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    window.history.replaceState(null, '', window.location.href);  // Clear browser history
    window.onpopstate = function(event) {
      history.go(1);  // Prevent going back in history after logout
    };
    
    // Fetch ships when component is initialized
    this.seaManagementService.getShips().subscribe(
      (ships: Ship[]) => {
        this.ships = ships;
      },
      (error) => {
        console.error('Error fetching ships:', error);
      }
    );
  }

  onShipSelect() {
    if (this.selectedShip) {
      this.owner = this.selectedShip.owner;
      // this.wakeel = this.selectedShip.wakeel; // Assuming this field exists
      // this.callSign = this.selectedShip.callSign;
      this.flag = this.selectedShip.flag;
      // this.totalWeight = this.selectedShip.totalWeight;
      // this.netWeight = this.selectedShip.netWeight;
      this.maxDive = this.selectedShip.maxDive;
      this.captainName = this.selectedShip.captainName;
    }
  }
  
  

  onSubmit() {
    if (!this.selectedShip) {
      this.errorMessage = 'يجب اختيار سفينة';
      return;
    }
  
    const shipArrivalData = {
      shipId: this.selectedShip._id, // Store the Ship ID
      shipName: this.selectedShip.shipName, // Store the Ship Name
      owner: this.owner,
      wakeel: this.wakeel,
      callSign: this.callSign,
      flag: this.flag,
      totalWeight: this.totalWeight,
      netWeight: this.netWeight,
      maxDive: this.maxDive,
      crewNumber: this.crewNumber,
      crewNationality: this.crewNationality,
      shipmentType: this.shipmentType,
      shippingPort: this.shippingPort,
      comingFrom: this.comingFrom,
      travelingTo: this.travelingTo,
      shipmentDetails: this.shipmentDetails,
      shipmentWeight: this.shipmentWeight,
      transitShipment: this.transitShipment,
      arrivalDate: this.arrivalDate,
      captainName: this.captainName,
      notes: this.notes,
    };
  
    this.seaManagementService.saveShipArrival(shipArrivalData).subscribe(
      (response) => {
        console.log('Ship arrival data saved successfully', response);
        this.formSubmitted = true;
        this.errorMessage = null;
        this.clearForm();
      },
      (error) => {
        console.error('Error saving ship arrival data', error);
        this.formSubmitted = false;
        this.errorMessage = 'فشل في إرسال النموذج. يرجى التحقق من جميع الحقول.';
      }
    );
  }
  

  clearForm() {
    this.shipName = '';
    this.owner = '';
    // this.agent = '';
    this.callSign = '';
    this.flag = '';
    this.totalWeight = 0;
    this.netWeight = 0;
    this.maxDive = 0;
    this.crewNumber = 0;
    this.crewNationality = '';
    this.shipmentType = '';
    this.shippingPort = '';
    this.comingFrom = '';
    this.travelingTo = '';
    this.shipmentDetails = '';
    this.shipmentWeight = 0;
    this.transitShipment = '';
    this.arrivalDate = '';
    this.captainName = '';
    this.notes = '';
  }
}
