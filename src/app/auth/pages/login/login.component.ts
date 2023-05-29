import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userLogin = this.fb.group({
      mail: ['', Validators.required ],
      password: ['', Validators.required ],
    })
  }

  login(): void {
    const mail = this.userLogin.get('mail')?.value;
    const password = this.userLogin.get('password')?.value;
    this.authService.login({ mail, password })
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          this.router.navigate(['/misfinanzas/admission'])
        },
        error: err => console.error(err.error.message)
      })
  }

}
