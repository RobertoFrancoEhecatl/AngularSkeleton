import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCapComponent } from './add-edit-cap.component';

describe('AddEditCapComponent', () => {
  let component: AddEditCapComponent;
  let fixture: ComponentFixture<AddEditCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
