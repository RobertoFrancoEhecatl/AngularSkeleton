import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Interfaces/User';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = '../../../assets/Json/users.json';
  users: User[] = []

  constructor(
    private http: HttpClient
  ) { 
    fetch(this.url)
    .then(response => response.json())
    .then(response => {
      this.users = response
    })
  }

  getUsers(){
    return this.http.get(this.url)
  }

  addUser(user: User){
    user.id = this.users.length + 1
    this.users.push(user)
    return of(true)
  }

  getUser(id: any){
    return of(this.users.filter(user => user.id === id))
  }
}
