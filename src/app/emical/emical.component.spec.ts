import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmicalComponent } from './emical.component';

describe('EmicalComponent', () => {
  let component: EmicalComponent;
  let fixture: ComponentFixture<EmicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
