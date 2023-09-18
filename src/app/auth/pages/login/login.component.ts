import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { WalletService } from 'src/app/services/wallet.service';
import { URL } from 'src/app/shared/enums/routes.enum';
import { UserStoreService } from 'src/app/store/signals.service';
import { WalletStoreService } from 'src/app/store/signals.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get mailErrorMsg(): string {
    const errors = this.loginForm.get('mail')?.errors;
    if( errors?.['required'] ) {
      return 'Debe ingresar un mail'
    } else if( errors?.['pattern'] ) {
      return 'El formato del email es incorrecto.'
    } else if( errors?.['USER_NOT_FOUND'] ) {
      return 'El email no esta registrado.'
    }
    return '';
  }

  get passErrorMsg(): string {
    const errors = this.loginForm.get('password')?.errors;
    if( errors?.['required'] ) {
      return 'La contraseña es obligatoria.'
    } else if( errors?.['minlength'] ) {
      return 'La contraseña debe ser de 8 caracteres.'
    } else if( errors?.['maxlength'] ) {
      return 'La contraseña debe ser de 8 caracteres.'
    } else if( errors?.['pattern'] ) {
      return 'Solo puedes usar letras y numeros.'
    } else if( errors?.['PASSWORD_INCORRECT'] ) {
      return 'Contraseña incorrecta.'
    }
    return '';
  }


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userSignal: UserStoreService,
    private walletService: WalletService,
    private walletSignal: WalletStoreService,
    private validateService: ValidateService,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      mail: ['', [ Validators.required, Validators.pattern( this.validateService.emailPattern )] ],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern( this.validateService.notEmpty ) ]],
    })
  }

  inputInvalid(input: string): boolean | undefined {
    return (
      this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched
    );
  }

  login(): void {
    if(this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
      return;
    }

    const { mail, password } = this.loginForm.value;
    this.authService.login({ mail, password })
      .subscribe({
        next: (data) => {
          if (data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.user._id!)
            this.userSignal.setState(data.user)
            data.user._id && this.walletService.getWallet(data.user._id!)
              .subscribe( wallet => {
                this.walletSignal.setState(wallet)
              })
              
            if (data.user.first) 
              this.router.navigate([URL.FIRST_ADMISSION], { queryParams: {id: data.user._id?.toString(), name: data.user.nickname }})
            else this.router.navigate([URL.HOME])
          }
        },
        error: err => {
          if (err.error.message === 'USER_NOT_FOUND') this.loginForm.get('mail')!.setErrors({ USER_NOT_FOUND: true })
          if (err.error.message === 'PASSWORD_INCORRECT') this.loginForm.get('password')!.setErrors({ PASSWORD_INCORRECT: true })
        }
      })
  }

}
