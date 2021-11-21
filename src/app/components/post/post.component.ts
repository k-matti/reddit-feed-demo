import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "src/app/models";

@Component({
  selector: "app-post",
  templateUrl: "post.component.html",
  styleUrls: ["post.component.scss"],
})
export class PostComponent {
  @Input()
  public post!: Post;

  public placeholder = "assets/placeholder.png";

  constructor(private readonly router: Router) {}

  public onPostOpen() {
    this.router.navigate(["/post-details"], { state: this.post.data });
  }

  public hasThumbnail() {
    return (
      this.post.data.thumbnail !== "self" &&
      this.post.data.thumbnail !== "spoiler" &&
      this.post.data.thumbnail !== "default"
    );
  }
}
