import { Component, OnInit } from '@angular/core';
import { getJson } from 'src/helpers/localstore';

const AUTH_KEY = 'auth';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

	public username:string;
	constructor() { }

	ngOnInit(): void {

		const { username } = getJson(AUTH_KEY);
		this.username = username

	}

}
