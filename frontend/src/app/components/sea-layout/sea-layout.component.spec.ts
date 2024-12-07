import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaLayoutComponent } from './sea-layout.component';

describe('SeaLayoutComponent', () => {
  let component: SeaLayoutComponent;
  let fixture: ComponentFixture<SeaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeaLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
