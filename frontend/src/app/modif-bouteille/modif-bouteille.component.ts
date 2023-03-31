import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../shared/token.service';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Imesbouteilles } from '../imesbouteilles';
import { FetchService } from '../fetch.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


// User interface
export class User {
  name: any;
  email: any;
}

@Component({
  selector: 'app-modif-bouteille',
  templateUrl: './modif-bouteille.component.html',
  styleUrls: ['./modif-bouteille.component.scss']
})

export class ModifBouteilleComponent implements OnInit {

  isSignedIn!: boolean;
  // title:string='Modifier la bouteille #';
  UserProfile!: User;
  modifBouteilleForm: FormGroup;
  bouteille: Imesbouteilles;

  formSubmitted = false;
  isDataSelected: boolean;
  listeCelliers: any;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fetchService: FetchService,
    private snackBar: MatSnackBar

  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile);
    });
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

    this.fetchService.getCelliers().subscribe((data: any) => {
        this.listeCelliers = data.data;
        console.log('les celliers');
        console.log(this.listeCelliers);
        
    });


    this.route.params.subscribe((params) => {
      console.log(params);

      this.fetchService.showBouteille(params['id']).subscribe((data: any) => {
        this.bouteille = data.data;
        console.log(this.bouteille);
        this.modifBouteilleForm.setValue({
          id_bouteillePerso: this.bouteille.id_bouteillePerso,
          nom_bouteillePerso: this.bouteille.nom_bouteillePerso,
          type_bouteillePerso: this.bouteille.type_bouteillePerso,
          pays_bouteillePerso: this.bouteille.pays_bouteillePerso,
          format_bouteillePerso: this.bouteille.format_bouteillePerso,
          prix_bouteillePerso: this.bouteille.prix_bouteillePerso,
          quantite_bouteillePerso: this.bouteille.quantite,
          description_bouteillePerso: this.bouteille.description_bouteillePerso,
          celliers_id: this.bouteille.celliers_id
        });
      });
    });

    this.modifBouteilleForm = this.formBuilder.group({
      id_bouteillePerso: [''],
      nom_bouteillePerso: ['', Validators.required],
      type_bouteillePerso: [''],
      pays_bouteillePerso: [''],
      format_bouteillePerso: [''],
      prix_bouteillePerso: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantite_bouteillePerso: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      description_bouteillePerso: [''],
      celliers_id: ['', [Validators.required]],

    });
  }

  modifierBouteille() {
    this.formSubmitted = true;
    if (this.modifBouteilleForm.valid) {
      this.route.params.subscribe((params) => {
        let updateBouteille: Imesbouteilles = this.modifBouteilleForm.value;
        console.log(params['id']);
        
        console.log(updateBouteille.id_bouteillePerso);
        
        this.fetchService.modifBouteille(params['id'], updateBouteille).subscribe((retour) => {
          console.log(retour);
          this.openSnackBar('Modification effectuée avec succès', 'Fermer');
          this.router.navigateByUrl('profil/cellier/' + this.bouteille.celliers_id);
        });
      });
    }
  }

  clearForm() {
    window.scroll({ // pour scroll up quand on arrive sur la page
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


    const controls = this.modifBouteilleForm.controls;
    Object.keys(controls).forEach(controlName => {
      console.log(this.bouteille[controlName]);
      console.log(controlName);
      let nom = controlName;
      if(controlName == 'quantite_bouteillePerso'){
         nom = 'quantite';
      }
      controls[controlName].setValue(this.bouteille[nom]);
    });


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
