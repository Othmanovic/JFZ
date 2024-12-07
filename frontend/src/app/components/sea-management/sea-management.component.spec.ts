import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaManagementComponent } from './sea-management.component';

describe('SeaManagementComponent', () => {
  let component: SeaManagementComponent;
  let fixture: ComponentFixture<SeaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeaManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
