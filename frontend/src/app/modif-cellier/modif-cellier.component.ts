import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../shared/token.service';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';

// User interface
export class User {
  name: any;
  email: any;
}

@Component({
  selector: 'app-modif-cellier',
  templateUrl: './modif-cellier.component.html',
  styleUrls: ['./modif-cellier.component.scss']
})

export class ModifCellierComponent implements OnInit {

  isSignedIn!: boolean;
  // title:string='Liste des celliers';
  UserProfile!: User;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile);
    });
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      console.log(this.isSignedIn);
    });
  }
  
}