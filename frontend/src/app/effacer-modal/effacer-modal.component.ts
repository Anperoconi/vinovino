import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-effacer-modal',
  templateUrl: './effacer-modal.component.html',
  styleUrls: ['./effacer-modal.component.scss']
})
export class EffacerModalComponent {
  @Input() id!: number;
  @Input() isVisible = false;
  @Output() itemEfface: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  constructor(
    public fetchService: FetchService,
    public router: Router,
  ) { }


  confirmer() {
    this.isVisible = false;
    this.fetchService.supprimerCellier(this.id).subscribe((retour) => {
      this.itemEfface.emit();
    });
  }

  annuler() {

    this.isVisible = false;
    this.closed.emit(); // emit the 'closed' event
  }
}