import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../enviroments/enviroment';
import { devEnvironment } from 'src/enviroments/enviroment.dev';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ChatComponent } from './chat/chat.component'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GrievancePageComponent } from './grievance-page/grievance-page.component';
import { MemoryLaneComponent } from './memory-lane/memory-lane.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LandingPageComponent,
    LoginComponent,
    GrievancePageComponent,
    MemoryLaneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(devEnvironment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
