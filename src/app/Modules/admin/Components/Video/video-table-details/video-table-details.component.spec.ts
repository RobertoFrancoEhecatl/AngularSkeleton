import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTableDetailsComponent } from './video-table-details.component';

describe('VideoTableDetailsComponent', () => {
  let component: VideoTableDetailsComponent;
  let fixture: ComponentFixture<VideoTableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTableDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
