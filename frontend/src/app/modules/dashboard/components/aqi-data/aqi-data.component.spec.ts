import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiDataComponent } from './aqi-data.component';

describe('AqiDataComponent', () => {
  let component: AqiDataComponent;
  let fixture: ComponentFixture<AqiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqiDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
