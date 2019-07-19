import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  rememberme: boolean = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    // this.usuario.email = 'raxel6092@gmail.com';
  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    // console.log('Formulario enviado');
    // console.log(this.usuario);
    // console.log(form);

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.newUser(this.usuario).subscribe( response => {
      console.log(response);
      Swal.close();

      if (this.rememberme) {
        localStorage.setItem('email',this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err.error.error.message);
      Swal.fire({
        type: 'error',
        title: 'Error al registrar',
        text: err.error.error.message
      });
    });
  }

}
