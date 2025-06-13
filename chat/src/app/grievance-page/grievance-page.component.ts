import { Component, OnInit } from '@angular/core';
import { GrievanceService } from '../service/grievance.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grievance-page',
  templateUrl: './grievance-page.component.html',
  styleUrls: ['./grievance-page.component.scss']
})
export class GrievancePageComponent implements OnInit {
  title: string = '';
  description: string = '';
  mood: string = '';
  severity: string = '';
  grievances: any[] = [];
  loggedInUser: string;

  selectedSeverity: string = '';
  customSeverity: string = '';

  emojiMoods = [
    { label: '😊 Happy', value: 'happy' },
    { label: '😔 Sad', value: 'sad' },
    { label: '😡 Angry', value: 'angry' },
    { label: '😩 Stressed', value: 'stressed' },
    { label: '🤔 Confused', value: 'confused' }
  ];

  severityLevels = [
    'Kiss 😘',
    'Kitkat 🍫',
    'Talk with me 🗣️',
    'Ignore 🙈',
    'Just needed to vent 💬',
    'Others... ✍️'
  ];

  constructor(
    private grievanceService: GrievanceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem('currentUser') || 'Anonymous';
    this.grievanceService.getGrievances().subscribe(data => {
      this.grievances = data.map((item: any) => {
        const payload = item?.payload?.val();
        const key = item?.payload?.key || item?.key;

        return {
          key: key,
          ...payload
        };
      }).filter(item => item && item.title);
    });
  }

  submitGrievance(): void {
    const finalSeverity = this.severity === 'Others... ✍️' ? this.customSeverity : this.severity;

    if (this.title.trim() && this.description.trim() && finalSeverity && this.mood) {
      this.grievanceService.submitGrievance({
        title: this.title.trim(),
        description: this.description.trim(),
        mood: this.mood,
        severity: finalSeverity,
        createdAt: new Date().toISOString(),
        sender: this.loggedInUser
      });

      // Reset fields
      this.title = '';
      this.description = '';
      this.mood = '';
      this.severity = '';
      this.customSeverity = '';
    } else {
      console.warn('All fields are required to submit a grievance');
    }
  }

  deleteGrievance(grievance: any): void {
    if (grievance.key) {
      this.grievanceService.deleteGrievance(grievance.key);
    }
  }
}
