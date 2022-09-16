import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	title = 'VAS Module';
	public isAuthenticated: boolean

	constructor(private auth: AuthService, route: ActivatedRoute) {
		this.isAuthenticated = this.auth.isAuthenticated(route.snapshot, "/item");
	}
}
