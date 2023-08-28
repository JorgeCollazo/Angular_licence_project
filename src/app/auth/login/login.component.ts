import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  private authStatusSub: Subscription = new Subscription();

  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService) { }

  // Icons
  faUser = faUser;

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusSub().subscribe(
      response => {
        this.isLoading = false;
      }
    )
  }

  onLogin(loginForm: NgForm) {
    this.isLoading = true;
    if(loginForm.invalid) {
      return;
    }

    this.authService.loginUser(loginForm.value.email, loginForm.value.password);
  }

}
