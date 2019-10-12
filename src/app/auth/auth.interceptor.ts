import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("interceptor")
      // if (req.headers.get('No-Auth') != "True")
      // {
      //     console.log(req.headers)
          
      //     return next.handle(req.clone());
      // }
       if (localStorage.getItem('userToken') != null) {
          const clonedreq = req.clone({
              headers: req.headers.set("Authorization", sessionStorage.getItem('userToken'))
          });
          console.log("interceptor adding auth");
          return next.handle(clonedreq)
              .do(
              succ => { },
              err => {
                 // if (err.status === 401)
                      this.router.navigateByUrl('/login');
              }
              );
      
      }else{
        return next.handle(req.clone());
      }
    }
}