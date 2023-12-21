import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorTypeByGenderComponent } from './motor-type-by-gender.component';

describe('MotorTypeByGenderComponent', () => {
  let component: MotorTypeByGenderComponent;
  let fixture: ComponentFixture<MotorTypeByGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorTypeByGenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorTypeByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
