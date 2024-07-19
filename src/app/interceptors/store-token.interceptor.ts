import { HttpInterceptorFn } from '@angular/common/http';

export const storeTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const userToken = localStorage.getItem('token');
  if(userToken){
      req=req.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
    })
  }
  return next(req);
};
