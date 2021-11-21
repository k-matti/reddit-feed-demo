import { Injectable } from "@angular/core";
import { Post, PostData } from "../models";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  public posts: Post[];
  public selectedPostData: PostData | null;
  public currentPage: number;
  public currentLimit: number;
  public after: string;
  public before: string | null;

  constructor() {
    this.posts = [];
    this.selectedPostData = null;
    this.currentPage = 1;
    this.currentLimit = 10;
    this.after = "";
    this.before = null;
  }
}
