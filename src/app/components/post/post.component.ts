import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "src/app/models";
import { SessionService } from "src/app/services/session.service";

@Component({
  selector: "app-post",
  templateUrl: "post.component.html",
  styleUrls: ["post.component.scss"],
})
export class PostComponent {
  @Input()
  public post!: Post;

  public placeholder = "assets/placeholder.png";

  constructor(
    private readonly router: Router,
    private sessionService: SessionService
  ) {}

  public onPostOpen() {
    this.sessionService.selectedPostData = this.post.data;
    this.router.navigate(["/post-details"]);
  }

  public hasThumbnail() {
    return (
      this.post.data.thumbnail !== "self" &&
      this.post.data.thumbnail !== "spoiler" &&
      this.post.data.thumbnail !== "default"
    );
  }
}
