import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  username: string = '';
  loading: boolean = false;
  startQuizDisabled: boolean = true;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private dataSerivce: DataService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.checkStartQuizEnabled();
    }
  }

  checkStartQuizEnabled(): void {
    this.startQuizDisabled = !(this.username && this.selectedFile);
  }

  startQuiz(): void {
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.loading = true;
    this.http.post('http://localhost:5000/upload-pdf', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
        this.loading = false;
        this.dataSerivce.startQuiz(this.username).subscribe((data) => {
          console.log('Quiz started', data);
        });
      },
      (error) => {
        console.error('Error uploading file', error);
        this.loading = false;
      }
    );
  }
}
