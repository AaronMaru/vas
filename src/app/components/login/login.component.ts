import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { setJson } from 'src/helpers/localstore';

const AUTH_KEY = 'auth';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

	public routeTitle: string;
	public username: string;
	public password: string;
	public errorMessage = false;
	public contactAdmin = false;

	constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
	}

	ngOnInit(): void {

		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

	}


	login() {
		const success = this.auth.login({
			'username': this.username,
			'password': this.password
		}).subscribe(
			(res: any) => {
				if (res.status === 401) {
					this.errorMessage = true;
					this.contactAdmin = false;
				} else if (res.roles.length === 0) {
					this.errorMessage = false;
					this.contactAdmin = true;
				} else {
					const now = new Date();
					res.expiredDate = new Date(now.getTime() + res.expirationInMs);
					setJson(AUTH_KEY, res);
					this.router.navigate(['campaign']);
				}
			},
			(err: any) => {
			});

	}

	logout() {
		// this.auth.logout();
	}

	isAuthenticated(route: ActivatedRouteSnapshot) {
		return this.auth.isAuthenticated(route, '');
	}

}
