import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  onSubmit(form: any) {
    console.log(form.value);
  }
  isLinear = true;

  ngOnInit() {}
  loginForm = this.builder.group({
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', [Validators.required, Validators.email]),
  });

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.http
        .post('http://localhost:8080/election/public/auth', data)
        .subscribe((resultData: any) => {
          this.router.navigate(['/admin']);
          alert('Login Success');
        });
    }
  }
}
