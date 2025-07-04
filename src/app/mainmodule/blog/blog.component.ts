import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from 'src/app/test.service';
import { Post, Data } from 'src/app/mainmodule/Data/datamodel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  title = '';
  showLoginFormOnly = false;  
  showAlertFormOnly = false;  
  log = false;
  result = false;
  alertform: FormGroup;
  loginform: FormGroup;
  imageBase64: string='';
  selectedImages!: File;
  VideoFile !: File;
  search=new FormControl();
 
  selectedVideoFile ?:File;
  videoPreviewUrl ?: string;
  public Editor: any = ClassicEditor;

  allPosts: Post[] = [];
  visiblePosts: Post[] = [];
  batchSize = 10;
  currentIndex = 0;
  loading = false;
  hasMorePosts = true;
  chatopen=false;
  
  inout=false;


  constructor(private fb: FormBuilder, private ts: TestService) {
    this.alertform = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
      image: '',
      video1:['']
    });

    this.loginform = this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }
  username:string='';
  ngOnInit() {
    this.loadPosts(); 
    this.ts.requestPermission();
    this.ts.listenForMessages();
  }

  toggleForm() {
    this.showAlertFormOnly = true;
    this.showLoginFormOnly = false;
  }

  closeform() {
    this.showAlertFormOnly = false;
    this.showLoginFormOnly = false;
  }

  login() {
    this.closeform();
    this.inout=false;
    this.log=true;
    this.showLoginFormOnly = true;
  }
  closelogin(){
    this.log=false;
    this.showLoginFormOnly = false;
    this.inout=true;
  }

  logout() {
    this.result = false;
    this.loginform.reset();
    this.showLoginFormOnly = true;
    this.inout=true;
    this.chatopen=false;

  }

  checkin() {
    if (this.loginform.valid) {
      const data: Data = {
        user: this.loginform.value.user ?? '',
        pwd: this.loginform.value.pwd ?? ''
      };
      this.ts.checkLogin(data).subscribe(res => {
        if (res === true) {
          this.result = true;
          this.showLoginFormOnly = false;
          this.loadPosts(); 
        } else {
          alert("Invalid credentials");
          this.loginform.reset();
        }
      });
    }
       this.ts.shownotify('Login','Login Successful')
       this.chatopen=true;
      const username = this.loginform.value.user; //user name 
      this.ts.setuser(username); // setuser calling
  }
searchMode = false;

onFileSelected(event: any): void {
  const file: File = event.target.files[0];

  if (file) {
    this.selectedImages = file;  

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string; 
    };
    reader.readAsDataURL(file);
  }
}

  onVideoSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.videoPreviewUrl = URL.createObjectURL(file);
    this.VideoFile = file;
    this.alertform.patchValue({ video1: file.name });
  }
  }
  onSubmit() {
  if (this.alertform.valid) {
    const formData = new FormData();
    formData.append('name', this.alertform.value.name);
    formData.append('text', this.alertform.value.text);
    formData.append('hide', 'false');
   if (this.selectedImages) {
      formData.append('Images', this.selectedImages.name);      
      formData.append('ImageFile', this.selectedImages);       
    }

    if (this.VideoFile) {
      formData.append('videoFile', this.VideoFile);
    }

    this.ts.addPost(formData).subscribe(res => {
      const newPost: Post = {
            name: this.alertform.value.name,
            text: this.alertform.value.text,
            image: this.alertform.value.image, 
            videoUrl: this.VideoFile?.name ?? '',
            collapsed: false
          };
      this.allPosts.unshift(newPost);
      this.closeform();
      this.resetAndReloadPosts();
      this.loadPosts();
    });

    this.ts.shownotify('New Post', 'Posted Successfully.......');
    this.ts.requestPermission();
  }
}

  toggleHide(post: Post) {
  post.hide = !post.hide;
  this.ts.hidedata({ id: post.id!, hide: post.hide }).subscribe(() => {
    post.collapsed = post.hide;
    console.log('Hide updated for post:', post.id);
  });
}


  loadPosts() {
    this.ts.getPosts().subscribe(res => {
      this.allPosts = res.map(post => ({
        ...post,
        collapsed: post.hide ?? false
        
      }));
      //console.log('Fetched Posts:', res[0])
      this.resetAndReloadPosts(); 
    });
  }

  onScroll() {
    this.loadMorePosts();
  }

  loadMorePosts() {
    if (this.loading || !this.hasMorePosts) return;

    this.loading = true;

    setTimeout(() => {
      const nextBatch = this.allPosts.slice(this.currentIndex, this.currentIndex + this.batchSize);
      if (nextBatch.length === 0) {
        this.hasMorePosts = false;
      } else {
        this.visiblePosts = [...this.visiblePosts, ...nextBatch];
        this.currentIndex += this.batchSize;
      }
      this.loading = false;
    }, 300); 
  }
  resetAndReloadPosts() {
    this.currentIndex = 0;
    this.visiblePosts = [];
    this.hasMorePosts = true;
    this.loadMorePosts();
  }
onSearching() {
  const name = this.search.value?.trim();
  if (!name) return;

  this.searchMode = true;

  const post: Post = {
    //id:0,
    name: name,
    text: '',           
    image: '',          
    videoUrl: '',        
    hide: false           
  };

  this.ts.searchPosts(post).subscribe({
    next: (results: Post[]) => {
      this.allPosts = results.map(post => ({
        ...post,
        collapsed: post.hide ?? false
      }));
      this.resetAndReloadPosts();
    },
    error: err => {
      console.error('Search error:', err.message);
    }
  });
}
clearSearch() {
  this.search.reset();
  this.searchMode = false;
  this.loadPosts(); 
}
}
