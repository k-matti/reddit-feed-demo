import { Post } from ".";

  export interface FeedData {
    after: string;
    dist: number;
    modhash: string;
    geo_filter?: any;
    children: Post[];
    before?: any;
}