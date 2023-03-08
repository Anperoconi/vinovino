import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './shared/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class GardienLoginGuard implements CanActivate {

  estConnecte : boolean = false;

  constructor(private authServ:AuthStateService, private router:Router) {
    this.authServ.statutConnexion().subscribe((etat)=>{
      this.estConnecte = etat;
      if(this.estConnecte === false) {
        this.router.navigate(["/"]);
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let valide = false;
      
      if (this.estConnecte) {
        valide = true;
      }
      if (valide) return true;
      else
      return this.router.parseUrl('/');
    }
}
