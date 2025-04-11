import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowingPilotageListComponent } from './towing-pilotage-list.component';

describe('TowingPilotageListComponent', () => {
  let component: TowingPilotageListComponent;
  let fixture: ComponentFixture<TowingPilotageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TowingPilotageListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TowingPilotageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
