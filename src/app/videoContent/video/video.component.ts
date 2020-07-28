import { Component, OnInit } from "@angular/core"
import { VideoService } from '../../services/video/video.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent{

  role: string;
  username: string;

  videosArray = [];


  constructor(private route: ActivatedRoute, public videoService:VideoService) {

    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');

    if(this.role == undefined){
      location.href = '/'
    }

    let path = this.route.snapshot.url.join('/');

    if(path == "student/video" && this.role == "1"){
      location.href = "/faculty/video";
    } else if(path == "faculty/video" && this.role == "0"){
      location.href = "/student/video";
    }

    this.videoService.readAll().subscribe(
      (res: any) => {
        if(res.status === 200) {
          //this.pResp.nativeElement.innerText = "";
          this.videosArray = res.videos;
        } else if(res.status === 404) {
          console.log(res);

          //this.pResp.nativeElement.innerText = "No Orders Found";
        } else {
          //this.pResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
        }
        // console.log(res);

      }, (error) => {
        //this.pResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
        // console.log(error);
      }
    );

  }

  ngOnInit(): void {
  }



}
