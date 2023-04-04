import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CellierComponent } from '../cellier/cellier.component';
import { ListeCellierComponent } from '../liste-cellier/liste-cellier.component';
import { AjoutBouteilleComponent } from '../ajout-bouteille/ajout-bouteille.component';
import { AjoutCellierComponent } from '../ajout-cellier/ajout-cellier.component';
import { ModifCellierComponent } from '../modif-cellier/modif-cellier.component';
import { ModifBouteilleComponent } from '../modif-bouteille/modif-bouteille.component';
import { RechercheComponent } from '../recherche/recherche.component';
import { DetailBouteilleComponent } from '../detail-bouteille/detail-bouteille.component';
import { ArchiveComponent } from '../archive/archive.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {
  @Input() id!: number;

  classeActuelle: object;
  pageActuelle: string;
  idCellier: any;
  btnAjouter: string;

  /**
   * Constructeur de la classe FooterComponent
   * @param router composant Router
   * @param route composant ActivatedRoute
   */
  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Fonction initiale dès l'instanciation de la classe
   */
  ngOnInit() {
    this.classeActuelle = this.route.component;
    this.route.params.subscribe((params) => {
      this.idCellier = params['id'];
    });
    switch (this.classeActuelle) {
      case CellierComponent:
        this.pageActuelle = 'cellier';
        break;
      case ListeCellierComponent:
        this.pageActuelle = 'listeCellier';
        break;
      case AjoutBouteilleComponent:
        this.pageActuelle = 'ajoutBouteille';
        break;
      case AjoutCellierComponent:
        this.pageActuelle = 'ajoutCellier';
        break;
      case ModifCellierComponent:
        this.pageActuelle = 'modifCellier';
        break;
      case ModifBouteilleComponent:
        this.pageActuelle = 'modifBouteille';
        break;
      case RechercheComponent:
        this.pageActuelle = 'recherche';
        break;
      case DetailBouteilleComponent:
        this.pageActuelle = 'detailBouteille';
        break;
      case ArchiveComponent:
        this.pageActuelle = 'archive';
        break;
      default:
        this.pageActuelle = 'autrePage';
        break;
    }
  }

  /**
   * Fonction qui permet de naviguer vers la page liste-cellier
   */
  back() {
    this.router.navigateByUrl('profil/liste-cellier');
    // pour remonter vers le haut de la page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  /**
   * Fonction qui permet l'ajout d'une bouteille dans un cellier
   */
  ajouter() {
    if (this.pageActuelle == 'cellier') {
      this.btnAjouter = 'ajoutBouteille';
      this.router.navigateByUrl('profil/ajouter-bouteille/' + this.idCellier);
    } else {
      this.btnAjouter = 'ajoutBouteille';
      this.router.navigateByUrl('profil/ajouter-bouteille/');
    }
    // pour remonter vers le haut de la page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  /**
   * Fonction qui permet de remonter vers le haut de la page
   */
  goUp() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
