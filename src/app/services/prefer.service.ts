import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getJson } from 'src/helpers/localstore';
import { Prefer } from '../model/prefer';
import { PreferUpload } from '../model/prefer-upload';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';


@Injectable({
	providedIn: 'root'
})
export class PreferService {

	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

	getPerferLists(search: string): Observable<Prefer> {
		let url = `${baseUrl}/prefer-accounts`;
		if (search !== '') {
			url = `${baseUrl}/prefer-accounts?name=${search}`;
		}

		return this.http.get<Prefer>(url, this.httpOptions);
	}

	uploadPrefereAccount(upload: PreferUpload): Observable<PreferUpload> {
		const url = `${baseUrl}/prefer-accounts`;
		return this.http.post<PreferUpload>(url, upload, this.httpOptions);
	}

	delete(id: number) {
		const url = `${baseUrl}/prefer-accounts/${id}`;
		return this.http.delete<Prefer>(url, this.httpOptions);
	}
}
