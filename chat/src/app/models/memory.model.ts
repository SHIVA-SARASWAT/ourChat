export interface Memory {
  id?: string; // Optional for Firebase auto-generated IDs
  mediaUrl: string; // URL of the photo or video
  caption: string; // Caption or note
  date: string; // Date of the memory
  tags: string[]; // Tags for the memory
}