import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSortComponent } from './visual-sort.component';

describe('VisualSortComponent', () => {
  let component: VisualSortComponent;
  let fixture: ComponentFixture<VisualSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
