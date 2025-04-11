import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowingPilotageCreateComponent } from './towing-pilotage-create.component';

describe('TowingPilotageCreateComponent', () => {
  let component: TowingPilotageCreateComponent;
  let fixture: ComponentFixture<TowingPilotageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TowingPilotageCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TowingPilotageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
