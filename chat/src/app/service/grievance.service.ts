import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrievanceService {

  constructor(private db: AngularFireDatabase) { }

  submitGrievance(grievance: any): void {
    this.db.list('/grievances').push(grievance).catch(error => {
      console.error('Error submitting grievance:', error);
    });
  }

  getGrievances(): Observable<any[]> {
    return this.db.list('/grievances').snapshotChanges();
  }

  deleteGrievance(key: string): void {
    this.db.list('/grievances').remove(key);
  }
}
