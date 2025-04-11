import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayanDashboardComponent } from './bayan-dashboard.component';

describe('BayanDashboardComponent', () => {
  let component: BayanDashboardComponent;
  let fixture: ComponentFixture<BayanDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BayanDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BayanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
