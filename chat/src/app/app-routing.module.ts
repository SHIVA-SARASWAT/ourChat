import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login-page/login-page.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';
import { GrievancePageComponent } from './grievance-page/grievance-page.component';
import { MemoryLaneComponent } from './memory-lane/memory-lane.component';
const routes: Routes = [
  { path:'',component:LandingPageComponent},
  { path:'login',component:LoginComponent},
  {path:'grievance',component:GrievancePageComponent, canActivate: [AuthGuard]},
  {path:'chat',component:ChatComponent,canActivate: [AuthGuard]},
  { path: 'memory-lane', component: MemoryLaneComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
