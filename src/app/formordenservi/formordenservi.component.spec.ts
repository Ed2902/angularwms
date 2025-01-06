import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormordenserviComponent } from './formordenservi.component';

describe('FormordenserviComponent', () => {
  let component: FormordenserviComponent;
  let fixture: ComponentFixture<FormordenserviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormordenserviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormordenserviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
