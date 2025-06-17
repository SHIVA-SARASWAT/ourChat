import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Memory } from '../models/memory.model';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  constructor(private db: AngularFireDatabase) {}

  // Add a new memory
  addMemory(memory: Memory): void {
    this.db.list('/memories').push(memory).catch(error => {
      console.error('Error adding memory:', error);
    });
  }

  // Get all memories
  getMemories(): Observable<any[]> {
    return this.db.list('/memories').snapshotChanges();
  }

  // Delete a memory
  deleteMemory(id: string): void {
    this.db.list('/memories').remove(id).catch(error => {
      console.error('Error deleting memory:', error);
    });
  }
}