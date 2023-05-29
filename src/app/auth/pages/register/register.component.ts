import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/Interfaces/interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createUserForm()
  }

  createUserForm() {
    this.userForm = this.fb.group({
      mail: ['', Validators.required ],
      nickname: ['', Validators.required ],
      password: ['', Validators.required ],
      confirmPassword: ['', Validators.required ]
    })
  }

  saveNewUser() {
    const newUser: User = {
      mail: this.userForm.get('mail')?.value,
      nickname: this.userForm.get('nickname')?.value,
      password: this.userForm.get('password')?.value,
      photo: ''
    }

    this.userService.createUser( newUser )
      .subscribe({
        next: user => console.log(user)
      })
  }

}
