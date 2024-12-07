import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipArrivalHistoryComponent } from './ship-arrival-history.component';

describe('ShipArrivalHistoryComponent', () => {
  let component: ShipArrivalHistoryComponent;
  let fixture: ComponentFixture<ShipArrivalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipArrivalHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipArrivalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
