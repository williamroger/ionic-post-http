import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { CustomerModel } from '../shared/customer';

const headers = new HttpHeaders({
 
});

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8100', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'});

  constructor(public http: HttpClient) { }

  createCustumer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post('http://localhost:8080/customer/insertcustomer', customer, {headers: this.header}).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCustomer)
    )
  }

  /**
 * Private Methods
 */
  private jsonDataToCustomer(jsonData: any): CustomerModel {
    return jsonData as CustomerModel;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na Requisição => ', error);

    return throwError(error);
  }
}
