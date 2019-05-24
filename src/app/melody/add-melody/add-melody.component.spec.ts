import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMelodyComponent } from './add-melody.component';

describe('AddMelodyComponent', () => {
  let component: AddMelodyComponent;
  let fixture: ComponentFixture<AddMelodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMelodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMelodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
