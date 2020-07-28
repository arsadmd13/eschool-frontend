import { Component, Output, EventEmitter, OnInit, ElementRef, ViewChild } from "@angular/core"
import { Comment } from "../comment.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-addComment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent{

  username: string;

  constructor(){
    this.username = sessionStorage.getItem('username');
  }

  @Output() commentAdded = new EventEmitter<Comment>();

  onCommentAdded(form: NgForm ){
    if(form.invalid){
      return;
    }
    const comment: Comment = {
      user: this.username,
      msg: form.value.commentText
    }

    //commentService.create(comment);

    this.commentAdded.emit(comment)
    form.resetForm();
  }
}
