import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievancePageComponent } from './grievance-page.component';

describe('GrievancePageComponent', () => {
  let component: GrievancePageComponent;
  let fixture: ComponentFixture<GrievancePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrievancePageComponent]
    });
    fixture = TestBed.createComponent(GrievancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
