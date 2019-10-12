import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();
  emailId:string;
roleName:any;
dateDetials = new Date();
  constructor(private loginService:LoginService,private route:Router) { }

  ngOnInit() {
    this.isUserLoggedIn();
    this.getUsername();
    this.getDate();
  }
getUsername(){

  this.emailId=this.loginService.getUserName();
  
}
isUserLoggedIn(){
  this.emailId="Admin";
  let user=sessionStorage.getItem('emailId');
  // this.userName=this.loginService.getUserName();
  // this.roleName=this.loginService.getLoggedInRole();
  return !(user==null)
}
getDate() {
  this.dateDetials = new Date();
}
logout(){
  sessionStorage.clear();
  this.route.navigate(['/'])
  
}
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
