import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldFormComponent } from './yield-form.component';

describe('YieldFormComponent', () => {
  let component: YieldFormComponent;
  let fixture: ComponentFixture<YieldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YieldFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
