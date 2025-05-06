import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionNetSearchComponent } from './protection-net-search.component';

describe('ProtectionNetSearchComponent', () => {
  let component: ProtectionNetSearchComponent;
  let fixture: ComponentFixture<ProtectionNetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectionNetSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectionNetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
