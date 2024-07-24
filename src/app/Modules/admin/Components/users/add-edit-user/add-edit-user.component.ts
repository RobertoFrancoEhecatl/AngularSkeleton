import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent {
  faArrowLeft = faArrowLeft
  imagenSeleccionada: any;

  UserForm:FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.UserForm = this.buildForm()
  }

  onFileSelected(event) {
    console.log(event.target.files[0])
    this.imagenSeleccionada = event.target.files[0];
    this.mostrarImagen()
  }

  mostrarImagen() {
    if (this.imagenSeleccionada) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.UserForm.get('usuario_foto').setValue(e.target.result);
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  buildForm(){
    return this.fb.group({
      usuario_nombre: new FormControl("", [Validators.required]),
      usuario_primer_apellido: new FormControl("", [Validators.required]),
      usuario_segundo_apellido: new FormControl("", [Validators.required]),
      usuario_email: new FormControl("", [Validators.required, Validators.email]),
      usuario_rol: new FormControl("", [Validators.required]),
      usuario_foto: new FormControl(null, [Validators.required])
    })
  }

  postUser(){
    console.log(this.UserForm.value)
  }
}
