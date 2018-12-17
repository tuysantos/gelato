import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error: boolean;
  public isLoggedIn = false;
  public errorMessage: string;
  
  constructor(public authService: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.logout();
    this.createForm();
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      userName: [ '', [ Validators.required ]],
      password: [ '', [ Validators.required ]]
    });
  }

  public logout(): void {
    this.storageService.resetHeader();
    this.storageService.resetUserCredentials();
    this.storageService.resetData();
    this.errorMessage = '';
  }

  public onSubmit(): void {
    this.error = false;
    this.errorMessage = '';
    if (this.form.valid) {
      this.authService.login(this.form.value.userName, this.form.value.password)
        .pipe(
          take(1)
        ).subscribe((data: any) => {
          if (data) {
            this.error = false;
            this.router.navigate(['/quote']);
          } else {
            this.error = true;
            this.errorMessage = 'Invalid user or password';
          }
        });
    }
  }
}
