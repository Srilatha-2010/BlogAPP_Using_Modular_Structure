import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './mainmodule';
import { ChatComponent } from './mainmodule/chat/chat.component';
import { PersonalchatComponent } from './mainmodule/personalchat/personalchat.component';
const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  {path:'',component:BlogComponent},
  {path:'chat',component:ChatComponent},
  {path:'Pchat',component:PersonalchatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
