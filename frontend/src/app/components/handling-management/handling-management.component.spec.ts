import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlingManagementComponent } from './handling-management.component';

describe('HandlingManagementComponent', () => {
  let component: HandlingManagementComponent;
  let fixture: ComponentFixture<HandlingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandlingManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandlingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
