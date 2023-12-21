import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedDialogComponent } from './subscribed-dialog.component';

describe('SubscribedDialogComponent', () => {
  let component: SubscribedDialogComponent;
  let fixture: ComponentFixture<SubscribedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
