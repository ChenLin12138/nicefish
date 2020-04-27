import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class PostService {
    public postDetailURL = "mock-data/post-mock.json";
    // public postListURL = "mock-data/postlist-mock.json";
    // public postListURL = "/nicefish/cms/post/post-list/";
    public postListURL = "http://localhost:8080/nicefish/cms/post/post-list/";
    public postListSearchURL = "mock-data/postlist-search-mock.json";

    constructor(public httpClient: HttpClient) {
    }

    public getPost(): Observable<any> {
        return this.httpClient.get(this.postDetailURL);
    }

    public getPostList(page : number): Observable<any> {
        return this.httpClient.get(this.postListURL+page);
    }

    public getPostNumber(): number {
        return 0;
    }

    public addPost() {

    }

    public search() {

    }
}
