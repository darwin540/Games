import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:8000/api/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createStudent(studentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, studentData);
  }

  updateStudent(id: number, studentData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, studentData);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  login(credentials: { email: string, phone: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  assignSala(id: number, salaId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/assign-sala`, { salaId });
  }

  uploadProfilePicture(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/profile-picture`, formData);
  }
  
  // Método para subir una imagen en base64 como perfil del estudiante
  uploadCapturedProfilePicture(id: number, base64Image: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/profile-picture`, { profile_picture: base64Image });
  }

}
