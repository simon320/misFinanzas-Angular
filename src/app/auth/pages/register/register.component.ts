import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidateService } from 'src/app/services/validate.service';
import { User } from 'src/app/shared/Interfaces/interface';
import { URL } from 'src/app/shared/enums/routes.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  get mailErrorMsg(): string {
    const errors = this.userForm.get('mail')?.errors;
    if( errors?.['required'] ) {
      return 'Debe ingresar un mail'
    } else if( errors?.['pattern'] ) {
      return 'El formato del email es incorrecto.'
    } else if( errors?.['USER_NOT_FOUND'] ) {
      return 'El email ya esta registrado.'// TODO: CAMBIAR BACKEND
    }
    return '';
  }

  get nameErrorMsg(): string {
    const errors = this.userForm.get('nickname')?.errors;
    if( errors?.['required'] ) {
      return 'Debe ingresar un nombre'
    } else if( errors?.['pattern'] ) {
      return 'Solo puede usar letras.'
    } else if( errors?.['minlength'] ) {
      return 'El nombre debe tener al menos 3 letras.'
    } else if( errors?.['maxlength'] ) {
      return 'No puede superar los 25 caracteres.'
    } else if( errors?.['USER_NOT_FOUND'] ) {
      return 'El email no esta registrado.'
    }
    return '';
  }

  get passErrorMsg(): string {
    const errors = this.userForm.get('password')?.errors;
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

  get cofirmPassErrorMsg(): string {
    const errors = this.userForm.get('confirmPassword')?.errors;
    if( errors?.['required'] ) {
      return 'Debe repetir la contraseña.'
    } else if( errors?.['notEquals'] ) {
      return 'La Contraseña no coincide.'
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private validateService: ValidateService,
  ) {}

  ngOnInit(): void {
    this.createUserForm()
  }

  createUserForm() {
    this.userForm = this.fb.group({
      mail: ['', [ Validators.required, Validators.pattern( this.validateService.emailPattern )] ],
      nickname: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern( this.validateService.onlyLetter ) ]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern( this.validateService.notEmpty ) ]],
      confirmPassword: ['', [ Validators.required ]]
    }, {
      validators: [ this.validateService.compareFields('password', 'confirmPassword') ]
    })
  }

  inputInvalid(input: string): boolean | undefined {
    return (
      this.userForm.get(input)?.invalid && this.userForm.get(input)?.touched
    );
  }

  registerNewUser() {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { mail, nickname, password } = this.userForm.value
    if(nickname.trim().length == 0) {
      this.userForm.get('nickname')?.reset();
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser: User = { mail, nickname, password, photo: '', first: true }

    this.userService.createUser( newUser )
      .subscribe({
        next: (_) => {
          alert('!Usuario creado con exito!\nAhora, ingrese esos datos para iniciar secion.')
          this.router.navigateByUrl(URL.LOGIN)
        },
        error: user => console.log(newUser)
      })
  }

}
