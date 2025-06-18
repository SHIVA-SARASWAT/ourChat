import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ChatServiceService } from '../service/chat-service.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  message: string = '';
  messages: any[] = [];
  loggedInUser: string; // Assuming you have stored the logged-in user in local storage

  constructor(private chatService: ChatServiceService, private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    // Retrieve logged-in user from local storage
    this.loggedInUser = localStorage.getItem('currentUser');
    console.log("ngOninti Logged in",this.loggedInUser);
    
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages.map(message => ({
        ...message
      }));
      console.log("ngOninit message",this.messages);

    });
    
  }
  

  @ViewChild('messageContainer') messageContainer: ElementRef;

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  // Implement AfterViewChecked lifecycle hook to scroll to the bottom after view checked
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.message);
      this.messages.push({
        text: this.message,
        createdAt: new Date(),
        sender: this.loggedInUser 
      });
      console.log("logged in user is",this.loggedInUser);
      
      console.log(this.messages);      
      
      this.message = '';
    }
  }
  logout(){
    this.authService.logout()
    this.router.navigate(['']);
  }

  grievance(){
    this.router.navigate(['/grievance']);
  }
  // Check if a message was sent by the logged-in user
  isSentByMe(message: any): boolean {
    // console.log('Sender:', message.sender);
    // console.log('Logged-in user:', this.loggedInUser);
    // console.log(message.sender == this.loggedInUser);
    // console.log("message",message);
    
    return message.sender === this.loggedInUser;
  }
  memoryLane(){
     this.router.navigate(['/memory-lane']);
  }
}
