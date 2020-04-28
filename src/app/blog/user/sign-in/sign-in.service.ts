import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http"

@Injectable()
export class SignInService {
  public userLoginURL = "mock-data/user-login-mock.json";
  public subject: Subject<any> = new Subject<any>();

  constructor(public httpClient: HttpClient) {
  }

  public get currentUser(): Observable<any> {
    return this.subject.asObservable();
  }

  public login() {
    return this.httpClient
      .get(this.userLoginURL)
      .subscribe(
        data => {
          console.log("login success>" + data);
          let user = data;
          console.log("user object>" + user);
          //localStorage可以将数据存储到本地存储。可以理解为浏览器端的缓存
          //被存储的数据只能是字符串形式的
          //JSON.stringify(user)将来user转换我string字符串
          //Subject<any>用来存储订阅对象，Subject.next尅实现多发，对订阅者的多发。
          //也就是说，当用户变更时，这个变更会应用到其它所有订阅subject的地方
          localStorage.setItem("currentUser", JSON.stringify(user));
          //Object.assign({}, user)将user添加到{}中
          this.subject.next(Object.assign({}, user));
        },
        error => {
          console.error(error);
        }
      );
  }

  public logout(): void {
    //退出的时候，移除currentUser
    localStorage.removeItem("currentUser");
    //从subject中移除。
    this.subject.next(Object.assign({}));
  }
}
