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
  msg: string;
  quota:string;
  subStatus: string;
  
  videosArray = [];


  constructor(private route: ActivatedRoute, public videoService:VideoService) {

    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');
    this.subStatus = sessionStorage.getItem('subStatus')
    this.quota = sessionStorage.getItem('subQuota');

    if(this.role === undefined || this.role === null){
      location.href = '/'
    }

    let path = this.route.snapshot.url.join('/');

    if(path == "student/video"){
      if(this.role == "1"){
        location.href = "/faculty/video";
      } else if (this.role == "2"){
        location.href = "/admin/video";
      }
    } else if(path == "faculty/video"){
      if(this.role == "0"){
        location.href = "/student/video";
      } else if (this.role == "2"){
        location.href = "/admin/video";
      }
    } else if(path == "admin/video"){
      if(this.role == "1"){
        location.href = "/faculty/video";
      } else if (this.role == "0"){
        location.href = "/student/video";
      } 
    }

    const data = {
      secTkn: sessionStorage.getItem('jwtToken')
    }

    this.videoService.readAll(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          if(this.subStatus === "AV"){
            this.videosArray = res.videos
            var len = this.videosArray.length
            if(len > parseInt(this.quota))
              this.videosArray = this.videosArray.slice(0,parseInt(this.quota));
           } else if(this.subStatus === "NN"){
            this.videosArray = res.videos
           } else {
             document.getElementById('alertclose').style.display = 'none'
             this.msg = "Please purchase a plan to avail video resources";
           }
        } else if(res.status === 404) {
          this.msg = "No videos Found!";
        } else {
          this.msg = res.message;
        }
      }, (error) => {
        this.msg = "We hit a road block while processing your request!"
      }
    );

  }

  ngOnInit(): void {
  }



}
