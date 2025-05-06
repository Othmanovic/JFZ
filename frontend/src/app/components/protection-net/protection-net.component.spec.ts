import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionNetComponent } from './protection-net.component';

describe('ProtectionNetComponent', () => {
  let component: ProtectionNetComponent;
  let fixture: ComponentFixture<ProtectionNetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectionNetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectionNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
