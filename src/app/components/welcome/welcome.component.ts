import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name:string;
  role:string;
  constructor(private loginService:LoginService) { }
  login(){

    this.loginService.login1()
    .subscribe(
      (data:any)=>{
        console.log(data);
        
       
      },
      (err : HttpErrorResponse)=>{
        console.log(err);
        alert("Invalid username/password")
      });
 
  }
  ngOnInit() {
    this.name=sessionStorage.getItem("name");
    this.role=sessionStorage.getItem("role");
  }

}
