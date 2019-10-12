import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { LoginService } from 'src/app/services/login.LoginService';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public emailId: boolean = false;
  showLoader: boolean = false;
  loginTest: any;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {

    if (sessionStorage.getItem("emailId") != null) {
      this.router.navigate(['/SO5AgileMetrics']);
    }
    this.loginForm = new FormGroup({
      emailId: new FormControl('projectadmin@hcl.com', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('1234', [Validators.required, Validators.maxLength(100)])
    });

  }
  login(formValue) {
    this.showLoader = true;

    // if(formValue.emailId=="admin@hcl.com" && formValue.password=="1234"){
    //   sessionStorage.setItem('emailId', formValue.emailId);

    //   this.router.navigate(['/SO5AgileMetrics']);
    // }`

    this.loginTest = this.loginService.loginValidationAPI(
      this.loginForm.get('emailId').value,
      this.loginForm.get('password').value);
      if(this.loginForm.get('emailId').value=='projectadmin@hcl.com' &&this.loginForm.get('password').value=='1234'){
        sessionStorage.setItem('emailId', formValue.emailId);
      }
   
    console.log(this.loginTest);

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
