import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedBillsComponent } from './denied-bills.component';

describe('DeniedBillsComponent', () => {
  let component: DeniedBillsComponent;
  let fixture: ComponentFixture<DeniedBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeniedBillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeniedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
