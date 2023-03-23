import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { IUser } from './iuser';
import { IlisteUser } from './iliste-user';
import {ICatalogue} from "./icatalogue";
import {Imesbouteilles} from "../../../../src/app/imesbouteilles";
import {IDate} from "./idate";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  // Important: Ne pas utilsier http://127.0.0.1:800, à la place utiliser ex:
  // private urlBouteille:string = environment.apiUrl+"/api/bouteilles";

  private urlUtilisateur:string = environment.apiUrl+"/api/utilisateurs";
  private urlExecute:string = environment.apiUrl+"/api/execute";

  constructor(private http:HttpClient) { }

  getUtilisateur():Observable<IlisteUser> {
    return this.http.get<IlisteUser>(this.urlUtilisateur);
  }

  effacerUtilisateur(id:number):Observable<IUser> {
    console.log(this.urlUtilisateur+"/"+id);
    return this.http.delete<IUser>(this.urlUtilisateur+"/"+id);
  }

  getDonnesSaq():Observable<ICatalogue> {
    return this.http.get<any>(this.urlExecute);
  }

    executeSaq(heure):Observable<any> {
    return this.http.post<IDate>(this.urlExecute, heure);
  }

  // ajoutBouteille(bouteille:Imesbouteilles):Observable<Imesbouteilles>{
  //   return this.http.post<Imesbouteilles>(this.urlExecute, bouteille);
  // }
}

