import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/AuthService/auth.service';
import { User } from 'src/app/Interfaces/User';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/Services/Local/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /* Icons */
  faLock = faLock;
  faLockOpen = faLockOpen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  loginForm: FormGroup;

  users: User[] = [];
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _localStorageService: LocalService
  ) {
    this.loginForm = this.BuildForm();
    /*     this.getUsers();
     */
  }

  /* Solo se usa para obtener información Dummy */
  /*   getUsers() {
    try {
      this._auth.getUsers().then((res) => {
        this.users = res;
      });
    } catch (e) {}
  } */

  BuildForm() {
    return this.fb.group({
      userEmail: new FormControl('', [Validators.email, Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }
  login() {
    if (this.loginForm.valid) {
      this._auth
        .getToken({
          userEmail: this.loginForm.value.userEmail,
          userPassword: this.loginForm.value.userPassword,
        })
        .subscribe({
          next: (res) => {
            console.log('Respuesta del servidor:', res);
            if (res && res.token) {
              this.router.navigate(['/admin/transactions']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Fallo de Inicio de Sesión',
                text: 'El email o password no son correctos',
                confirmButtonText: 'Continuar',
              });
            }
          },
          error: (error) => {
            console.error('Error durante el inicio de sesión:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error de autenticación',
              text: 'No se pudo iniciar sesión con las credenciales proporcionadas.',
              confirmButtonText: 'Reintentar',
            });
          },
        });
    }
  }

  /* 
    Recibe como parametro el usuario y lo almacena en el
    localStorage para poder acceder a la información del usuario
   */
  setUserData(user: User) {
    this._localStorageService.setJsonValue('userRole', user.userRol);
    this._localStorageService.setJsonValue('userName', user.userName);
    this._localStorageService.setJsonValue('isLoggedIn', true);
    console.log('user', this._localStorageService.getJsonValue('userRole'));
  }

  redirect() {
    if (this._localStorageService.getJsonValue('userRole') === '1') {
      this.router.navigate(['/admin/transactions']);
    }
  }
}
