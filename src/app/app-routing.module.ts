import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './mainmodule';
import { ChatComponent } from './mainmodule/chat/chat.component';
const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  {path:'',component:BlogComponent},
  {path:'chat',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
