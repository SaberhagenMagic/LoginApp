import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  rememberme: boolean = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.rememberme = true;
    }
  }

  login( form: NgForm) {
    if( form.invalid ) { return; }
    // console.log('Imprimir si el formulario es valido');
    // console.log(this.usuario);

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario ).subscribe( response => {
      console.log(response);
      Swal.close();
      if(this.rememberme) {
        localStorage.setItem('email',this.usuario.email);
      }
      
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err.error.error.message);
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    } );
  }
}
