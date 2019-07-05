import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyB-SGmSjrENXkOXKBRRRhtnZrmCNDd7rUg';
  userToken: string;
  // Crear nuevo usurio
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  constructor(private http: HttpClient) {
    this.loadToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        // console.log('Entro en mapa de del RXJS');
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  newUser(usuario: UsuarioModel){
    // const authData = {
    //   email: usuario.email,
    //   password: usuario.password,
    //   returnSecureToken: true
    // };
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        // console.log('Entro en mapa de del RXJS');
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private saveToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  loadToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  statusAuntenticate(): boolean {
    return this.userToken.length > 2;
  }
}
