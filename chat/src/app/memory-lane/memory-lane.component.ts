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

  snackbar = {
    show: false,
    message: '',
    type: 'info' as 'info' | 'success' | 'error',
    loading: false
  };

  constructor(private memoryService: MemoryService) {}

  ngOnInit(): void {
    this.showSnackbar('Loading memories...', 'info', true); // Show loading snackbar
    this.memoryService.getMemories().subscribe(
      data => {
        this.memories = data.map(item => ({
          id: item.payload.key,
          ...item.payload.val()
        })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.showSnackbar('Memories loaded!', 'success'); // Show success snackbar
      },
      error => {
        this.showSnackbar('Failed to load memories.', 'error'); // Show error snackbar
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async addMemory(): Promise<void> {
    if (this.selectedFile && this.newMemory.caption && this.newMemory.date) {
      this.showSnackbar('Uploading memory...', 'info', true); // Show loading snackbar
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
        this.showSnackbar('Memory added successfully!', 'success'); // Show success
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        this.showSnackbar('Error uploading memory.', 'error'); // Show error
      }
    } else {
      console.warn('All fields are required to add a memory');
      this.showSnackbar('All fields are required to add a memory', 'error');
    }
  }

  deleteMemory(memoryId: string): void {
    this.memoryService.deleteMemory(memoryId);
    this.showSnackbar('Memory deleted successfully!', 'success');
  }

  showSnackbar(message: string, type: 'info' | 'success' | 'error' = 'info', loading = false, duration = 3000) {
    this.snackbar = { show: true, message, type, loading };
    if (!loading) {
      setTimeout(() => (this.snackbar.show = false), duration);
    }
  }

  hideSnackbar() {
    this.snackbar.show = false;
  }

  getFileName(url: string): string {
    return url ? url.split('/').pop()?.split('?')[0] || 'memory.jpg' : 'memory.jpg';
  }

  downloadImage(url: string, filename: string) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => { 
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(link.href);
      });
  }
}
