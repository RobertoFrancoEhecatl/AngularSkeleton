import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitulosSerieComponent } from './capitulos-serie.component';

describe('CapitulosSerieComponent', () => {
  let component: CapitulosSerieComponent;
  let fixture: ComponentFixture<CapitulosSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitulosSerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitulosSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
