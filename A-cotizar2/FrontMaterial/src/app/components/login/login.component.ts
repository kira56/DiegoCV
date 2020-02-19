import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;
  
  objLogin={
    usu_email:'',
    usu_pass:''
  }


  email = new FormControl('', [Validators.required, Validators.email]);
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private authService:AuthService,private _Usuario:UsuarioService) { }
  
  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
      
    });
  }
  clearCredentials(){
    this.objLogin.usu_email ='';
    this.objLogin.usu_pass ='';
  }
  iniciarSesion()
  {
    this._Usuario.postIniciarSesion(this.objLogin).subscribe((response:any)=>{
      this._Usuario.saveToken(response.token);
      console.log(response )
      this.clearCredentials();
      console.log("logeado");
    });


  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
  signOut(): void {
    this.authService.signOut();
  }

  emailError() {
    console.log(this.email.hasError);
    
    return this.email.hasError('required') ? 'ejemplo@gmail.com' :
        this.email.hasError('email') ? 'El Usuario no existe' :
            '';
  }

}
