import { Component, OnInit } from '@angular/core';
// Import necessary modules
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // User variable
  public user;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', 0, '', '', '', false);
  }

  ngOnInit(): void {}
  // Declare Login Method
  login(loginForm: any) {
    // Validate is form is valid
    if (!loginForm.valid) {
      // Validate invalid or incomplete data
      console.log('Missing required fields');
    } else {
      // Execute Login
      this.userService.login(this.user).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Response Error: ', error);
        }
      );
    }
  }
}
