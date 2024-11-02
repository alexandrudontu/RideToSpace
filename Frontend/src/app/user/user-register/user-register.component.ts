import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted!: boolean;

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.createRegistrationForm();  
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordMatchingValidator() });
  }

  passwordMatchingValidator(): ValidatorFn {
    return (fg: AbstractControl): { [key: string]: any } | null => {
      return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { notMatching: true };
    };
  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  onSubmit() {
    this.userSubmitted = true;
    if(this.registrationForm.valid) {
      this.authService.registerUser(this.userData()).subscribe(() =>
      {
        this.registrationForm.reset();
        this.userSubmitted = false;
        this.alertify.success("You have been registered successfully");
        this.router.navigate(['/']);
      });
    } 
  }

  userData(): UserForRegister {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value
    }
  }
}
