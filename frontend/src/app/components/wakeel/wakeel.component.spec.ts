import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeelComponent } from './wakeel.component';

describe('WakeelComponent', () => {
  let component: WakeelComponent;
  let fixture: ComponentFixture<WakeelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WakeelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WakeelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
