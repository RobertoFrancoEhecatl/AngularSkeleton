import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-capitulos-serie',
  templateUrl: './capitulos-serie.component.html',
  styleUrls: ['./capitulos-serie.component.scss']
})
export class CapitulosSerieComponent implements AfterViewInit {
  faArrowLeft = faArrowLeft

  serieForm: FormGroup;
  @ViewChild('btn') button!: ElementRef
  constructor(
    private fb: FormBuilder
  ) {
    var anchoPantalla = window.innerWidth;
    var altoPantalla = window.innerHeight;

    // Mostrar el tamaño de la pantalla en la consola
    console.log("Ancho de la pantalla: " + anchoPantalla);
    console.log("Alto de la pantalla: " + altoPantalla);
    this.serieForm = this.buildForm()
  }
  
  ngAfterViewInit(): void {
  }

  buildForm() {
    return this.fb.group({
      serie_title: new FormControl("", [Validators.required]),
      serie_status: new FormControl("", [Validators.required]),
      serie_descripcion: new FormControl("", [Validators.required]),
    })
  }

}
