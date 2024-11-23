import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  username: string = '';

  constructor(private dataService: DataService) {}

  startQuiz(): void {
    this.dataService
      .startQuiz(this.username)
      .subscribe((response: { status: any }) => {
        console.log(response.status);
      });
  }
}
