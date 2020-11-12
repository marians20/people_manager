import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth.service';

@Component({
  selector: 'ppl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: Auth) { }

    public get isAuthenticated(): boolean {
      return this.auth.isAuthenticated;
    }

  ngOnInit(): void {
  }

  public goToRoute(url: string): void {
    this.router.navigateByUrl(url);
  }

  public logout(): void {
    this.auth.logout();
  }

}
