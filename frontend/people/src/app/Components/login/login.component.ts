import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginViewModel } from './login.viewmodel';

@Component({
  selector: 'ppl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private data: LoginViewModel = {
    user: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: this.data.user,
      password: this.data.password,
    });
  }

  public onSubmit(formValue): void {
  }
}
