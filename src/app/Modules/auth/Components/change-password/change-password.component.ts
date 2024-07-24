import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Services/AuthService/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  hide = true;
  hide2 = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  newPasswordForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.newPasswordForm = this.buildForm();
    this.newPasswordForm.setValidators(this.passwordMatchValidator.bind(this));
  }

  buildForm() {
    return this.fb.group({
      new_password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]],
      new_password_confirm: ['', [
        Validators.required,
      ]],
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('new_password');
    const confirmPassword = group.get('new_password_confirm');
    
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { 'passwordMismatch': true } 
      : null;
  }

  setPassword() {
    if (this.newPasswordForm.invalid || this.newPasswordForm.hasError('passwordMismatch')) {
      // You should handle form errors and inform the user
      Swal.fire('Error', 'Formulario no válido. Asegúrese de que las contraseñas coincidan.', 'error');
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Enviando información...',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });

    const formValue = this.newPasswordForm.value;
    this.authService.confirmForgotPassword({
      email: 'user email', // Replace with actual user email
      token: 'reset token', // Replace with actual reset token
      newPassword: formValue.new_password,
      confirmNewPassword: formValue.new_password_confirm,
    }).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso Completado',
          text: 'La contraseña ha sido actualizada',
          confirmButtonText: 'Continuar',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la contraseña.',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }
}
