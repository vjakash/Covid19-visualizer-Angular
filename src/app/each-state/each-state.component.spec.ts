import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachStateComponent } from './each-state.component';

describe('EachStateComponent', () => {
  let component: EachStateComponent;
  let fixture: ComponentFixture<EachStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
