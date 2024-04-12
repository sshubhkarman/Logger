import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomLoggerComponent } from './random-logger.component';

describe('RandomLoggerComponent', () => {
  let component: RandomLoggerComponent;
  let fixture: ComponentFixture<RandomLoggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomLoggerComponent]
    });
    fixture = TestBed.createComponent(RandomLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
