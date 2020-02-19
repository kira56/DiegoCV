import { Component, OnInit } from '@angular/core';
import { AuthService ,SocialUser} from 'angularx-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-cliente',
  templateUrl: './usuario-cliente.component.html',
  styleUrls: ['./usuario-cliente.component.css']
})
export class UsuarioClienteComponent implements OnInit {
  private loggedIn: boolean;
  public user: SocialUser;
  events: string[] = [];
  opened: boolean;

  constructor(private authService:AuthService,
    private router:Router) { }

    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(user)
        this.loggedIn = (user != null);
      });
  
    
    }

}

