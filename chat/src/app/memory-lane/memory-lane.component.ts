import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../service/memory.service';
import { Memory } from '../models/memory.model';
import axios from 'axios';

@Component({
  selector: 'app-memory-lane',
  templateUrl: './memory-lane.component.html',
  styleUrls: ['./memory-lane.component.scss']
})
export class MemoryLaneComponent implements OnInit {
  memories: Memory[] = [];
  newMemory: Memory = {
    mediaUrl: '',
    caption: '',
    date: '',
    tags: []
  };
  selectedFile: File | null = null;

  constructor(private memoryService: MemoryService) {}

  ngOnInit(): void {
    this.memoryService.getMemories().subscribe(data => {
      this.memories = data.map(item => ({
        id: item.payload.key,
        ...item.payload.val()
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log('Memories loaded:', this.memories);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async addMemory(): Promise<void> {
    if (this.selectedFile && this.newMemory.caption && this.newMemory.date) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'memory_lane_preset');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dxazrd3vo/image/upload',
          formData
        );
        this.newMemory.mediaUrl = response.data.secure_url;
        this.memoryService.addMemory(this.newMemory);
        this.newMemory = { mediaUrl: '', caption: '', date: '', tags: [] };
        this.selectedFile = null;
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
      }
    } else {
      console.warn('All fields are required to add a memory');
    }
  }

  deleteMemory(memoryId: string): void {
    this.memoryService.deleteMemory(memoryId);
  }
}
