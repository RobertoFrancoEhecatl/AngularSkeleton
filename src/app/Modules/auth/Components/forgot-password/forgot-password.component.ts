import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  createChangePasswordForm(){
    return this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    })
  }

  sendEmail(){
    Swal.fire({
      icon: "info",
      title: "Enviando información...",
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Proceso Completado",
        text: "Los pasos para el cambio de contraseña han sido enviados a su correo",
        confirmButtonText: "Continuar"
      }).then(() => {
        this.router.navigate(['/login'])
      })
    }, 3000);
  }
}
