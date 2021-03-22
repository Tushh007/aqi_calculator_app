import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiJsonComponent } from './aqi-json.component';

describe('AqiJsonComponent', () => {
  let component: AqiJsonComponent;
  let fixture: ComponentFixture<AqiJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqiJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqiJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
