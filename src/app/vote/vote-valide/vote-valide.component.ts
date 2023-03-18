import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-vote-valide',
  templateUrl: './vote-valide.component.html',
  styleUrls: ['./vote-valide.component.css'],
})
export class VoteValideComponent {
  constructor(private service: AuthService) {
    this.service.getSyndicats().subscribe((resp) => {
      this.resultats = resp;
    });
  }
  resultats: any;
}
