import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodyListComponent } from './melody-list.component';

describe('MelodyListComponent', () => {
  let component: MelodyListComponent;
  let fixture: ComponentFixture<MelodyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MelodyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
