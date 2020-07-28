// import { Component } from "@angular/core"
//
// import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
//
// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload-video.component.html',
//   styleUrls: ['./upload-video.component.css']
// })
//
// export class UploadComponent{
//
//   uploader:FileUploader = new FileUploader({url:"http://localhost:3000/api/upload"});
//
//   attachmentList:any = [];
//
//   constructor(){
//
//         this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
//             this.attachmentList.push(JSON.parse(response));
//         }
//     }
//
//
// }

import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';




const URL = 'https://nameless-plateau-81910.herokuapp.com/video/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})



export class UploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  role: string;
  username: string;
  userid: string;
  msg: string;
  progress: string;

  constructor(private toastr: ToastrService) {

    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');
    this.userid = sessionStorage.getItem('userid');

    if(this.role != "1"){
      location.href = '/'
    }

    this.msg = "Supported format: mp4"

  }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      this.msg = "Please wait while we upload your file!"
    };
    this.uploader.onProgressItem = (progress: any) => {
      this.progress = progress['progress'];
      console.log(progress['progress']);
    };
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.msg = "Click upload and wait few seconds until the file gets uploaded!"

    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.msg = "File uploaded!"
      //location.href = "/faculty/upload"
    };
  }

}
