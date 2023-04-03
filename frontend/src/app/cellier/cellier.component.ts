import { Component, OnInit, Input, Output } from '@angular/core';
import { TokenService } from '../shared/token.service';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { ICellier } from '../icellier';
import { FetchService } from '../fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibouteillecellier } from '../ibouteille-cellier';
import { Imesbouteilles } from '../imesbouteilles';
import { EffacerBouteilleModalComponent } from '../effacer-bouteille-modal/effacer-bouteille-modal.component';
import { environment } from '../../environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';




// User interface
export class User {
  name: any;
  email: any;
}

@Component({
  selector: 'app-cellier',
  templateUrl: './cellier.component.html',
  styleUrls: ['./cellier.component.scss'],
})
export class CellierComponent implements OnInit {
  @Input() cellier: ICellier;

  bouteilles: Array<Ibouteillecellier>;
  // bouteilles: Array<unknown>;
  bouteille: Imesbouteilles;
  cellierId: string;
  cellierNom:string;
  isSignedIn!: boolean;
  UserProfile!: User;
  unCellier: any;
  spin: boolean = true;
  hide: boolean = true;
  pageCellier: boolean = true;

  counterValue: number = 0;
  quantite: number;
  id: number;

  isVisibleSupprimer = false;
  isVisibleArchiver = false;

  inputArchive: any;

  imgBouteilleNonDisponible = environment.baseImg + 'img/nonDispo.webp';

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    public fetchService: FetchService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile);
    });
    this.bouteilles = [];
  }

  ngOnInit() {

    window.scroll({ // pour scroll up quand on arrive sur la page
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      console.log(this.isSignedIn);
    });

    this.route.params.subscribe((params) => {

      this.cellierId = params['id'];
      console.log(params['id']);

      this.fetchService.getBouteillesCellier(params['id']).subscribe((data: any) => {
        this.bouteilles = (data.data).filter(bouteille => bouteille.quantite > 0);

        this.inputArchive = document.getElementById('archive');

        this.inputArchive.addEventListener('change', e => {
          console.log(e.target.checked)
          if(e.target.checked === true) {
            this.fetchService.getBouteillesCellier(params['id']).subscribe((data: any) => {
              this.bouteilles = data.data;
            });
          }
          if(e.target.checked === false) {
            this.fetchService.getBouteillesCellier(params['id']).subscribe((data: any) => {
              this.bouteilles = (data.data).filter(bouteille => bouteille.quantite > 0);
            });
          }
        });
  
        if(this.bouteilles[0]) {
          this.cellierNom = this.bouteilles[0].cellier_nom;
        }

        this.spin = false;
        this.hide = false;
      });
    });
  }


  modifier(id: number, quantite: number) {

    this.fetchService.showBouteille(id).subscribe((data: any) => {
      this.bouteille = data.data;
      this.bouteille.quantite = quantite;

      let updateBouteille: Imesbouteilles = this.bouteille;
      console.log(updateBouteille);
      
      this.fetchService.modifBouteille(id, updateBouteille).subscribe((retour) => {

        if (this.bouteille.quantite > 0) {
          this.openSnackBar('La quantité fut modifiée avec succès', 'Fermer');
        }

        this.route.params.subscribe((params) => {
          this.cellierId = params['id'];
          
          this.fetchService.getBouteillesCellier(params['id']).subscribe((data: any) => {
            this.bouteilles = (data.data).filter(bouteille => bouteille.quantite > 0);
            // this.bouteilles = data.data;
          });
        });

      });

      if (this.bouteille.quantite == 0) {
        this.openModalArchiver(id, quantite);
      }

    });

  }


  // modal d'effacement

  openModalSupprimer(id: number) {
    console.log(id);
    console.log(this.isVisibleSupprimer);
    this.id = id;
    this.isVisibleSupprimer = true;
  }

  openModalArchiver(id: number, quantite: number) {
    console.log(id);
    console.log(quantite);
    console.log(this.isVisibleArchiver);
    this.id = id;
    this.quantite = quantite;
    this.isVisibleArchiver = true;
  }

  closeModal() {
    this.isVisibleSupprimer = false;
    this.isVisibleArchiver = false;
  }

  onModalClosed() {
    this.isVisibleSupprimer = false;
    this.isVisibleArchiver = false;
  }

    // this.openSnackBar('La bouteille est maintenant archivée', 'Fermer');
  

  rafraichirListe() {
    this.route.params.subscribe((params) => {

      this.cellierId = params['id'];
      console.log(params['id']);

      this.fetchService
        .getBouteillesCellier(params['id'])
        .subscribe((data: any) => {
          this.bouteilles = data.data;

          console.log('raffraichissement des bouteilles');
          console.log(this.bouteilles);
          this.isVisibleSupprimer = false;
          this.isVisibleArchiver = false;
        });
    });
  }



  goUp() {
    console.log("par en haut");

    window.scroll({ // pour scroll up quand on arrive sur la page
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


  pageCelliers() {
    window.scroll({ // pour scroll up
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.router.navigateByUrl('profil/liste-cellier');
  }


  /**
* Cette fonction affiche un message de type snackbar.
* @param message Le message à afficher.
* @param action L'action à afficher sur le bouton de fermeture du snackbar.
*/
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Set the duration to 3 seconds
    config.panelClass = ['mon-snackbar']; // Add a custom CSS class
    this.snackBar.open(message, action, config);
  }
}
