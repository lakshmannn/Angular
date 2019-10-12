
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }
  emailId: string = "";
  roleName: string = "";

  getUserName() {
    return sessionStorage.getItem("emailId");
  }
  getLoggedInRole() {
    return sessionStorage.getItem("roleName");
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('emailId');
    return !(user === null)
  }
  login(emailId, password): Observable<boolean> {

    var reqHeader = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(emailId + ':' + password) });

    return this.http.get('http://localhost:7071/userdetails', { headers: reqHeader }).map(
      (response) => {
        console.log('Basic ' + btoa(emailId + ':' + password));
        sessionStorage.setItem("emailId", response['emailId']);
        sessionStorage.setItem("roleName", response['roleName']);

        sessionStorage.setItem("userToken", 'Basic ' + btoa(emailId + ':' + password));
        console.log(response);
        return true;
      })
    error => {
      sessionStorage.removeItem("userToken");
      console.log(error);
      //return Observable.throw(error);
    };
  }

  login1(): Observable<boolean> {

    var reqHeader = new HttpHeaders({ 'Authorization': 'Basic dXNlcjE6cGFzc3dvcmQ=' });

    return this.http.get('http://localhost:7071/userdetails1').map(
      (response) => {
        console.log(response);
        return true;
      })
    error => {

      console.log(error);
      //return Observable.throw(error);
    };
  }
  loginValidationAPI(emailId,
    password) {
      debugger;
    let formData: FormData = new FormData();
    formData.append('emailId', emailId);
    formData.append('password', password);

    this.http.post("http://localhost:8080/api/users/validation",
      formData)
      .subscribe(
        data => {
          console.log(data);
        
          sessionStorage.setItem('logged_in_role', data["ro"]["role"]);
          sessionStorage.setItem('logged_in_email_id', data["ro"]["emailId"]);

          if (data["ro"]["role"] == "Admin") {
            this.router.navigate(['/SO5AgileMetrics']);
          }
        },
        error => {
          if (error["error"]["statusCode"] == "404")
            alert(error["error"]["message"]);

        }

      );
  }


}
