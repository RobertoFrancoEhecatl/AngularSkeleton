import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { faCirclePlay, faClock, faArrowLeft, faArrowRightFromBracket, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  faClock = faClock
  faCirclePlay =  faCirclePlay

  faChevronLeft =  faChevronLeft
  faChevronRight = faChevronRight
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  scrollIncrement = 400; // Incremento de desplazamiento en píxeles

  constructor(private zone: NgZone) {}

  scrollLeft() {
    this.zone.runOutsideAngular(() => {
      const container = this.scrollContainer.nativeElement;
      const currentScroll = container.scrollLeft;
      container.scrollTo({
        left: currentScroll - this.scrollIncrement,
        behavior: 'smooth'
      });
    });
  }

  scrollRight() {
    this.zone.runOutsideAngular(() => {
      const container = this.scrollContainer.nativeElement;
      const currentScroll = container.scrollLeft;
      container.scrollTo({
        left: currentScroll + this.scrollIncrement,
        behavior: 'smooth'
      });
    });
  }
}
