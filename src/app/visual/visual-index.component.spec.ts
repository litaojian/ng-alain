import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualIndexComponent } from './visual-index.component';

describe('VisualIndexComponent', () => {
  let component: VisualIndexComponent;
  let fixture: ComponentFixture<VisualIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
