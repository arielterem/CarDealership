import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeByHobbyComponent } from './age-by-hobby.component';

describe('AgeByHobbyComponent', () => {
  let component: AgeByHobbyComponent;
  let fixture: ComponentFixture<AgeByHobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeByHobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeByHobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
