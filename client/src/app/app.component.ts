import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Welcome to social app';
  users: any;

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit()
  {
    this.getUsers();
  }

  getUsers()
  {
    this._httpClient.get('https://localhost:7255/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log("I got the error from api", error)
    });
  }

}
