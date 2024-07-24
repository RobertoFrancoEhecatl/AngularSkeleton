import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  faChevronLeft =  faChevronLeft
  faChevronRight = faChevronRight
  faCirclePlay =  faCirclePlay

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
