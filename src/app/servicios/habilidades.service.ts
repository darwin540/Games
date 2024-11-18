import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  private readonly apiUrl = 'http://127.0.0.1:8000/api'; // URL base del backend

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el ID del estudiante desde el localStorage
   * @returns {number} ID del estudiante
   */
  private getStudentId(): number {
    const studentData = localStorage.getItem('student');
    if (!studentData) {
      throw new Error('No se encontró información del estudiante en el localStorage');
    }
    const student = JSON.parse(studentData);
    return student.id;
  }

  /**
   * Obtiene las habilidades del estudiante desde el backend
   * @returns {Observable<any>} Observable con los datos de las habilidades
   */
  getHabilidades(): Observable<any> {
    const studentId = this.getStudentId();
    const url = `${this.apiUrl}/students/${studentId}/habilidades`;
    return this.http.get(url);
  }

  /**
   * Guarda o actualiza las habilidades de un estudiante
   * @param habilidades Objeto con los valores de las habilidades
   * @returns {Observable<any>} Observable con la respuesta del backend
   */
  saveHabilidades(habilidades: any): Observable<any> {
    const studentId = this.getStudentId();
    const url = `${this.apiUrl}/students/${studentId}/habilidades`;
    return this.http.post(url, habilidades);
  }
}
