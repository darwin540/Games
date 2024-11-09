import { Component, OnInit } from '@angular/core';
import { StudentService } from '../servicios/student.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  playersInSala1: { id: string; name: string; salaId: string }[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadPlayersInSala1();
  }

  loadPlayersInSala1(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.playersInSala1 = data.students
          .filter((student: any) => student.salaId === 1)
          .map((student: any) => ({
            id: student.id,
            name: student.name,
            salaId: student.salaId
          }));
      },
      (error) => {
        console.error('Error al cargar los jugadores:', error);
      }
    );
  }

}
