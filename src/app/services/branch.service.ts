import { Injectable } from '@angular/core';
import { Branch } from '../model/campaigns/branch';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getJson } from 'src/helpers/localstore';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

  getBranches(search: string): Observable<Branch> {
		let url = `${baseUrl}/branches`;
		if (search !== '') {
			url = `${baseUrl}/branches?name=${search}`;
		}

		return this.http.get<Branch>(url, this.httpOptions);
	}
}
