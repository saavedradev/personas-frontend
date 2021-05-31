import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptChildComponent } from './adopt-child.component';

describe('AdoptChildComponent', () => {
  let component: AdoptChildComponent;
  let fixture: ComponentFixture<AdoptChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
