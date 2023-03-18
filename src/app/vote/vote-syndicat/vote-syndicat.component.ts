import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-vote-syndicat',
  templateUrl: './vote-syndicat.component.html',
  styleUrls: ['./vote-syndicat.component.css'],
})
export class VoteSyndicatComponent {
  [x: string]: any;
  Niveau: string[] = ['Licence', 'Master'];
  syndicatList: string[] = [];

  faculites: string[] = [
    'Faculté des Sciences et Techniques',
    'Faculté de Médecine ',
    'Faculté des Sciences Juridiques et Economiques',
    'Faculté des Lettres et des Sciences Humaines',
    'Institut Universitaire Professionnel',
  ];
  instituts: string[] = [
    ' Institut Supérieur d’Enseignement Technologique de ROSSO',
    'Centre National des Œuvres Universitaires',
    'Institut Supérieur des Etudes et des Recherches Islamiques',
    'Institut Supérieur d`Anglais',
    'Institut Supérieur Professionnel des Langues, de Traduction et d`Interprétariat',
    ' Institut Supérieur du Numérique',
    'Institut Supérieur de Comptabilité et d’Administration des Entreprises(ISCAE)',
  ];
  syndicats: any;
  myStrings: string[] = [
    'Union Nationale des Etudient Mauritanie',
    'Syndicat Nationale des Etudient de Mauritanie',
    'Union Generale des Etudient de Mauritanie',
  ];
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private service: AuthService
  ) {
    this.service.getSyndicats().subscribe((resp) => {
      this.syndicats = resp;
      //this.myStrings = resp.((obj: { nom: any }) => obj.nom);
    });
  }

  onSubmit(form: any) {
    console.log(form.value);
  }
  isLinear = false;

  ngOnInit(): void {}
  form = this.builder.group({
    person: this.builder.group({
      INE: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
    }),
    choix: this.builder.group({
      syndicat: this.builder.control('', Validators.required),
    }),
    validation: this.builder.group({
      code: this.builder.control('', Validators.required),
    }),

    termine: this.builder.group({}),
  });
  get personForm() {
    return this.form.get('person') as FormGroup;
  }

  get choixForm() {
    return this.form.get('choix') as FormGroup;
  }
  get validationForm() {
    return this.form.get('validation') as FormGroup;
  }
  get termineForm() {
    return this.form.get('termine') as FormGroup;
  }
  syndicatNomList: string[] = ['ok'];
  eludientdata: any;
  data1: any;
  nom: any;
  prenom: any;
  email: any;
  message: any;
  logo: any;
  syndicatNom: any;
  nbrv: any;
  validation1() {
    const url = 'http://localhost:8080/election/public/vote/validation';
    const data = {
      email: this.form.value.person?.email,
      INE: this.form.value.person?.INE,
      syndicatNom: this.form.value.choix?.syndicat,
      code: this.form.value.validation?.code,
    };
    this.http.post(url, data).subscribe((response) => {
      console.log(response);
      // Assign the response to a property in your component to use in your template
      this.data1 = response;
      this.nom = 'Nom: ' + this.data1.nom;
      this.prenom = 'Prenom : ' + this.data1.prenom;
      this.email = 'Email : ' + this.data1.email;
      this.logo = 'Logo : ' + this.data1.logo;
      this.syndicatNom = 'Syndicat : ' + this.data1.syndicatNom;
      this.nbrv = 'Nombre de votes: ' + this.data1.nbrv;
      this.message = 'Votre vote est terminer avec success';
    });
  }

  getEmail() {
    console.log(this.form.value);
    let email = this.form.value.person?.email;
    this.http
      .get(`http://localhost:8080/election/public/vote/get/${email}`)
      .subscribe((resultData: any) => {
        //this['router'].navigate(['vote/syndicat']);
        alert('Email send Success');
      });
  }
}

interface Syndicat {
  nom: string;
  logo: string;
}
