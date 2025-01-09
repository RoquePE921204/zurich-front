import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProfileComponent } from './insurance-profile.component';

describe('InsuranceProfileComponent', () => {
  let component: InsuranceProfileComponent;
  let fixture: ComponentFixture<InsuranceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
