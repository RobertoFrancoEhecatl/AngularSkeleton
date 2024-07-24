import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-cap',
  templateUrl: './add-edit-cap.component.html',
  styleUrls: ['./add-edit-cap.component.scss']
})
export class AddEditCapComponent implements AfterViewChecked{
  faArrowLeft = faArrowLeft
  CapituloForm: FormGroup;
  imagenSeleccionada: any;

  constructor(
    private fb: FormBuilder,
    private cdRef:ChangeDetectorRef
  ){ 
    this.CapituloForm = this.buildForm()
    this.onChanges()
  }
  
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  buildForm(){
    return this.fb.group({
      capitulo_titulo: new FormControl(null, [Validators.required]),
      capitulo_descripcion: new FormControl(null, [Validators.required]),
      capitulo_estatus: new FormControl(null, [Validators.required]),
      capitulo_tipo: new FormControl("Embed", [Validators.required]),
      capitulo_embed: new FormControl(null, [Validators.required]),
      capitulo_file: new FormControl({value: null, disabled: true}),
      capitulo_cover: new FormControl(null, Validators.required),
      capitulo_new_file_band: new FormControl(null, [Validators.required]),
      capitulo_new_file_type: new FormControl({value: null, disabled: true}),
      capitulo_new_file:  new FormControl({value: null, disabled: true}),
      capitulo_audio:  new FormControl(null),
      capitulo_libro:  new FormControl(null)
    })
  }

  onFileSelected(event) {
    this.imagenSeleccionada = event.target.files[0];
    this.mostrarImagen()
  }

  mostrarImagen() {
    if (this.imagenSeleccionada) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.CapituloForm.get('capitulo_cover').setValue(e.target.result);
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  onChanges(){
    this.CapituloForm.get("capitulo_tipo").valueChanges.subscribe( value => {
      if(value === 'Video'){
        this.CapituloForm.get("capitulo_file").enable()
        this.CapituloForm.get("capitulo_file").setValidators(Validators.required)
        this.CapituloForm.get("capitulo_embed").disable()
        this.CapituloForm.get("capitulo_embed").clearValidators()
      } else {
        this.CapituloForm.get("capitulo_file").disable()
        this.CapituloForm.get("capitulo_file").clearValidators()
        this.CapituloForm.get("capitulo_embed").enable()
      }
    })

    this.CapituloForm.get("capitulo_new_file_band").valueChanges.subscribe( value => {
      if(value === 'Si'){
        this.CapituloForm.get("capitulo_new_file_type").enable()
        this.CapituloForm.get("capitulo_new_file_type").setValidators(Validators.required)
      } else {
        this.CapituloForm.get("capitulo_new_file_type").disable()
        this.CapituloForm.get("capitulo_new_file_type").clearValidators()
      }
    })

    this.CapituloForm.get("capitulo_new_file_type").valueChanges.subscribe( type => {
      console.log("value", type)
      if(type){
        this.CapituloForm.get("capitulo_new_file").enable()
        this.CapituloForm.get("capitulo_new_file").setValidators(Validators.required)
      } else {
        
        this.CapituloForm.get("capitulo_new_file").disable()
        this.CapituloForm.get("capitulo_new_file").clearValidators()
      }
    })
  }

  checkValues(){
    console.log(this.CapituloForm)
  }
}
