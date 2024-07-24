import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements AfterContentChecked {
  peliculaForm:FormGroup;
  faArrowLeft = faArrowLeft
  imagenSeleccionada: any;

  constructor(
    private fb: FormBuilder,
    private cdRef:ChangeDetectorRef
  ){
    this.peliculaForm = this.buildForm()
    this.OnChanges()
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  buildForm(){
    return this.fb.group({
      video_title: new FormControl("", [Validators.required]),
      video_estatus: new FormControl("", [Validators.required]),
      video_descripcion: new FormControl("", [Validators.required]),
      video_tipe: new FormControl("", [Validators.required]),
      video_cover: new FormControl(""),
      video_embed: new FormControl({disabled: true, value: null}),
      video_file: new FormControl({disabled: true, value: null}),
    })
  }

  OnChanges(){
    this.peliculaForm.get("video_tipe").valueChanges.subscribe(value => {
      console.log(value)
      if(value === "Embed"){
        this.peliculaForm.get("video_embed").enable();
        this.peliculaForm.get("video_embed").setValidators(Validators.required);
        this.peliculaForm.get("video_file").disable();
        this.peliculaForm.get("video_file").clearValidators();
      }
      else{
        this.peliculaForm.get("video_file").enable();
        this.peliculaForm.get("video_file").setValidators(Validators.required);
        this.peliculaForm.get("video_embed").disable();
        this.peliculaForm.get("video_embed").clearValidators();
      }
    })
  }

  seeFormData(){
    console.log(this.peliculaForm.value)
  }

  onFileSelected(event) {
    this.imagenSeleccionada = event.target.files[0];
    this.mostrarImagen()
  }

  mostrarImagen() {
    if (this.imagenSeleccionada) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.peliculaForm.get('video_cover').setValue(e.target.result);
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }
}
