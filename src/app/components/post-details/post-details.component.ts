import { Component, OnInit } from "@angular/core";
import { PostData } from "src/app/models";
import { Location } from "@angular/common";

@Component({
  selector: "app-post-details",
  template: `
    <div>
      <div>
        <p>Title: {{ postData?.title }}</p>
        <p>
          Self text:
          {{ postData?.selftext !== "" ? postData?.selftext : "NO SELF TEXT" }}
        </p>
      </div>
      <button mat-stroked-button color="primary" (click)="goBack()">
        Go back to dashboard
      </button>
    </div>
  `,
  styles: [],
})
export class PostDetailsComponent implements OnInit {
  public postData: PostData | null;

  constructor(private location: Location) {
    this.postData = null;
  }

  ngOnInit(): void {
    this.postData = this.location.getState() as PostData;
  }

  goBack(): void {
    this.location.back();
  }
}
