import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipArrivalDetailsComponent } from './ship-arrival-details.component';

describe('ShipArrivalDetailsComponent', () => {
  let component: ShipArrivalDetailsComponent;
  let fixture: ComponentFixture<ShipArrivalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipArrivalDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipArrivalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
