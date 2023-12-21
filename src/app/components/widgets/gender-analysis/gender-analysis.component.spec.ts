import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderAnalysisComponent } from './gender-analysis.component';

describe('GenderAnalysisComponent', () => {
  let component: GenderAnalysisComponent;
  let fixture: ComponentFixture<GenderAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
