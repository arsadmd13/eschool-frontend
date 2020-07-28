import { Component, Output, EventEmitter } from "@angular/core"

import { Comment } from "./comment.model"

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent{
  storedComments: Comment[] = []

  onCommentAdded(comment){
    this.storedComments.push(comment)
  }
}
