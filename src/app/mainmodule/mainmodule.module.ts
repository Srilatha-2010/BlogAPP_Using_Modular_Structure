import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { PersonalchatComponent } from './personalchat/personalchat.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BlogComponent, ChatComponent, PersonalchatComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CKEditorModule,RouterModule,MatIconModule
  ],
  exports: [BlogComponent]
})
export class MainmoduleModule { }
