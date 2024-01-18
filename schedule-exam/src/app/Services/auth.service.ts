import { Injectable} from "@angular/core";
import {User} from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [
    new User(1, 'test1@test1.com', 'test', 'student'),
    new User(2, 'test2@test2.com', 'test', 'professor'),
    new User(3, 'test3@test3.com', 'test', 'professor-coordinator'),
    new User(4, 'test4@test4.com', 'test', 'secretary')

  ]
  private  currentUser: User | null = null;
  private currentUserRole: string | null = null;

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email = email);
    console.log(user);
    if(user && user.password === password) {
      console.log('Login successful. Setting currentUser:', user);
      this.setCurrentUser(user);
      return true;
    }
    return  false;
  }

  logout() {
    this.currentUser = null;
  }

  isAuthenticated() : boolean {
    return this.currentUser !== null;
  }

  hasRole(expectedRole: string): boolean {
    return this.currentUser?.role === expectedRole;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    this.setUserRole(user.role);
  }
  setUserRole(role: string): void {
    this.currentUserRole = role;
  }
  getCurrentUser(): User | null {
    return this.currentUser;
  }

}
