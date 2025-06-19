import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CKEditorModule,
  ],
  exports: [BlogComponent]
})
export class MainmoduleModule { }
