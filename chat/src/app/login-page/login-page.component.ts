import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  message:string = ''
  ngOnInit(): void {}

  get formControls() {
    return this.loginForm.controls;
  }

  login(): void {
    if (!this.loginForm.valid) {
      console.log("form is invalid");
      
      this.message = 'Invalid username/password!'
      return;
    }
    else{
      console.log("form is valid");
      
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (this.authService.login(username, password)) {
      this.router.navigate(['/chat']);
    } else {
      this.message = "Invalid username/password!"
    }
  }
}
