import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'app works!';

  private API = 'http://adverse.api.andrew-chiu.com';

  public events: any[] = [];

  public message: string = '';

  public currentPage:number = 1;

  public totalItems:number = 0; // total numbar of page not items

  public maxSize:number = 30; // max page size

  public totaltems: number = 0;

  public total: number = 0;

  public limit: number = 0;

  constructor(private http: Http) {}

  ngOnInit(){
    this.getEvents(1);
  }

  public setCurrentPage(pageNo:number):void {
    console.log('setpage', pageNo);
    this.currentPage = pageNo;
  };

  public pageChanged(event:any):void {
  //this method will trigger every page click
  this.getEvents(this.currentPage);
  };

  public keys(object): Array<string> {
    return Object.keys(object);
  }

  public isObject(object){
    return (typeof object === 'object')
  }

  //TODO: add this addEvent later
  addEvent(valueObject){
    this.http.post(`${this.API}/events`, valueObject)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(() => {
        this.getEvents(this.currentPage);
      })
  }

  deleteEvent(id:string){
    this.http.delete(`${this.API}/events/${id}`)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(data => {
        this.getEvents(this.currentPage);
        this.message = data.message;
      });

  }

  getEvents(page) {
    this.http.get(`${this.API}/events/page/${page}`)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(result => {
        console.log('result', result);
        this.events = result.docs;
        this.currentPage = result.page;
        this.totalItems = result.total;
        this.total = result.total;
        this.limit = result.limit;
      });
  }



}
