import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryLaneComponent } from './memory-lane.component';

describe('MemoryLaneComponent', () => {
  let component: MemoryLaneComponent;
  let fixture: ComponentFixture<MemoryLaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoryLaneComponent]
    });
    fixture = TestBed.createComponent(MemoryLaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
