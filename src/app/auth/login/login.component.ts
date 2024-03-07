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
    // this.authStatusSub = this.authService.getAuthStatusSub().subscribe(
    //   response => {
    //     this.isLoading = false;
    //   }
    // )
    this.document.body.classList.remove('dark-mode');
  }

  onLogin(loginForm: NgForm) {

    if(loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(loginForm.value.email, loginForm.value.password);
    this.authService.getAuthStatusSub()
      .subscribe(res => {
        this.isLoading = res;
      })
  }

}
