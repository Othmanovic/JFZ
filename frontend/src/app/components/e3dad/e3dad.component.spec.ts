import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E3dadComponent } from './e3dad.component';

describe('E3dadComponent', () => {
  let component: E3dadComponent;
  let fixture: ComponentFixture<E3dadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [E3dadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(E3dadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
