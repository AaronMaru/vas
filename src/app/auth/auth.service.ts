import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { getJson, setJson } from 'src/helpers/localstore';
import { Credentials } from './auth.inteface';


const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private role: string;

	constructor(private http: HttpClient, private router: Router) { }

	isAuthenticated(route: ActivatedRouteSnapshot, url: any): boolean {
		const { accessToken, expiredDate, roles } = getJson(AUTH_KEY);
		let storageRole: string;
		if (roles) {
			roles.forEach(e => {
				storageRole = e.authority;

			});
			if (route.data.role && route.data.role !== storageRole) {
				this.router.navigate(['/login']);
				return false;
			}
		}
		let date = new Date().getTime();
		let expirationDate = new Date(expiredDate).getTime();
		this.autoLogout(expirationDate - date);
		return !!accessToken;
	}

	login(credentials: Credentials) {
		return this.http.post(`${baseUrl}/auth/staff`, credentials)
	}

	logout() {
		setJson(AUTH_KEY, {});
		return true;
		// this should request to api to revoke token ( clear login session in api )
	}
	autoLogout(expired) {
		setTimeout(() => {
			this.logout();
		}, expired);
	}
}

