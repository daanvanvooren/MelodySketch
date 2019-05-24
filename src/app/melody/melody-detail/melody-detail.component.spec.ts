import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodyDetailComponent } from './melody-detail.component';

describe('MelodyDetailComponent', () => {
  let component: MelodyDetailComponent;
  let fixture: ComponentFixture<MelodyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MelodyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
