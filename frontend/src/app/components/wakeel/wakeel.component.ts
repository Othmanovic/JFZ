import { Component } from '@angular/core';
import { SeaManagementService } from '../../services/sea-management.service';

@Component({
  selector: 'app-wakeel',
  templateUrl: './wakeel.component.html',
  styleUrl: './wakeel.component.scss'
})
export class WakeelComponent {

  wakeel: any = { name: '', balance: 0 };
  wakeels: any[] = [];
  selectedTab: string = 'wakeel';

  constructor(private seaManagementService: SeaManagementService) {}

  ngOnInit(): void {
    this.loadWakeels();
  }

  loadWakeels(): void {
    this.seaManagementService.getWakeels().subscribe(
      (data) => {
        this.wakeels = data.map(w => ({ ...w, topUpAmount: 0 }));
      },
      (error) => {
        console.error('Error loading wakeels:', error);
      }
    );
  }

  addWakeel(): void {
    this.seaManagementService.createWakeel(this.wakeel).subscribe(
      (newWakeel) => {
        this.wakeels.push({ ...newWakeel, topUpAmount: 0 });
        this.wakeel = { name: '', balance: 0 };
      },
      (error) => {
        console.error('Error creating wakeel:', error);
      }
    );
  }

  topUpWakeel(id: string, amount: number): void {
    if (!amount || amount <= 0) {
      alert('أدخل مبلغًا صالحًا');
      return;
    }

    this.seaManagementService.topUpWakeel(id, amount).subscribe(
      (updatedWakeel) => {
        const index = this.wakeels.findIndex((w) => w._id === id);
        if (index !== -1) {
          this.wakeels[index] = { ...updatedWakeel, topUpAmount: 0 };
        }
      },
      (error) => {
        console.error('Error topping up wakeel:', error);
      }
    );
  }

}
