import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private authUrls: string[] = [
    'http://localhost:8080/auth/customer/send-otp',  // Backend API URL for login
    'http://localhost:8080/auth/customer/verify-otp' // Backend API URL for sending OTP
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isAuthUrl = this.authUrls.some(url => req.url === url);

    // console.log(req.url +" "+ );

    console.log("Intercepted URL:", req.url, "Is Auth URL:", isAuthUrl);

    if (!isAuthUrl) { 
      const token = localStorage.getItem('authToken');
      console.log("Token in Interceptor:", token);

      if (token) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(clonedRequest);
      }
    }

    // If it's an authentication URL or no token, proceed without modifying the request
    return next.handle(req);
  }

}
