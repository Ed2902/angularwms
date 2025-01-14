import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOperacionComponent } from './tabs-operacion.component';

describe('TabsOperacionComponent', () => {
  let component: TabsOperacionComponent;
  let fixture: ComponentFixture<TabsOperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsOperacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
