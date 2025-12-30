import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrarEvaluacionRequest, RegistrarEvaluacionResponse } from '../models/evaluacion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Evaluaciones {
  private readonly apiUrl = 'https://localhost:5001/api/evaluaciones';

  constructor(private http: HttpClient) {}

  registrarEvaluacion(
    payload: RegistrarEvaluacionRequest
  ): Observable<RegistrarEvaluacionResponse> {
    return this.http.post<RegistrarEvaluacionResponse>(
      this.apiUrl,
      payload
    );
  }
}
