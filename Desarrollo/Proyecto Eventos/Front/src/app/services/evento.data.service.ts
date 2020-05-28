import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {Evento} from '../models/evento';

@Injectable()
export class EventoDataService {

  apiURL = 'https://eventos-uv-api.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    })
  };

  findAll(): Observable<Evento> {
    return this.http.get<Evento>(this.apiURL + '/eventos', this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  create(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiURL + '/eventos', evento, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.apiURL + '/eventos/' + id).subscribe(data => {})
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
