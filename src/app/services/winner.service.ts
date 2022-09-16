import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getJson } from 'src/helpers/localstore';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Winner } from '../model/winner';
import { Branch } from '../model/campaigns/branch';
import { SearchWinner } from '../model/search-winner';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
	providedIn: 'root'
})
export class WinnerService {
	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

	getWinner(search: string): Observable<Winner> {
		let url = `${baseUrl}/winners`;
		if (search !== '') {
			url = `${baseUrl}/winners?name=${search}`;
		}

		return this.http.get<Winner>(url, this.httpOptions);
	}

	searchWinner(search: SearchWinner): Observable<SearchWinner> {
		console.log(search);

		const url = `${baseUrl}/winners/search`;
		return this.http.post<SearchWinner>(url, search, this.httpOptions);
	}
}
