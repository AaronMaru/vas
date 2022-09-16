import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getJson } from 'src/helpers/localstore';
import { BlackList } from '../model/black-list';
import { BlackListUpload } from '../model/black-list-upload';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
	providedIn: 'root'
})
export class BlackListService {

	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

	getBlackLists(search: string): Observable<BlackList> {
		let url = `${baseUrl}/black-lists`;
		if (search !== '') {
			url = `${baseUrl}/black-lists?name=${search}`;
		}

		return this.http.get<BlackList>(url, this.httpOptions);
	}

	uploadBlackList(upload: BlackListUpload): Observable<BlackListUpload> {
		const url = `${baseUrl}/black-lists`;
		return this.http.post<BlackListUpload>(url, upload, this.httpOptions);
	}

	delete(id: number) {
		const url = `${baseUrl}/black-lists/${id}`;
		return this.http.delete<BlackList>(url, this.httpOptions);
	}

}
