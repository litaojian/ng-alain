import { Component , OnInit}        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService }      from '../base/acl/auth.service';
import { CookieService } from '../base/cookies.service';


@Component({
  //templateUrl: './logout.component.html',
  template: `
    <h2>LOGOUT</h2>
    <p>{{message}}</p>
    <p>
      <button (click)="logout()" *ngIf="isLoggedIn()">Logout</button>
    </p>`
})


export class LogoutComponent implements OnInit {
  message: string;

  constructor(private authService: AuthService, private router: Router) {
    
  }

  ngOnInit() {
    this.logout();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  logout() {
    let url = this.authService.logout();
    if (url.startsWith("http")){
      window.location.href = url;
    }else{
      this.router.navigate([url]);
    }
    
  }
}
