import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public title = 'VAS Module';
  public isAuthenticated: boolean;

  constructor(private auth: AuthService, route: ActivatedRoute, private router: Router) {
    this.isAuthenticated = this.auth.isAuthenticated(route.snapshot, "/item");
  }

  ngOnInit(): void {
  }


  logout() {
    let logoutStatus = this.auth.logout();
    if (logoutStatus) {
      this.router.navigate(['login']);
    }
  }

}
