import { Component, EventEmitter, Output } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faBars = faBars
  @Output() openSideNav: EventEmitter<any> = new EventEmitter();
  open = true;
  
  openSideView(){
    var anchoVentana = window.innerWidth;
    console.log("Ancho de la ventana: " + anchoVentana);
    this.openSideNav.emit(anchoVentana)
  }
}
