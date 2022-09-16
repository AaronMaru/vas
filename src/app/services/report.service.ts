import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getJson } from 'src/helpers/localstore';
import { FilterStock } from '../model/items/FilterStock';
import { ItemDetail } from '../model/items/item-detail';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';


@Injectable({
	providedIn: 'root'
})
export class ReportService {

	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

	stocks(): Observable<ItemDetail> {
		let url = `${baseUrl}/reports/stock/`;
		return this.http.get<ItemDetail>(url, this.httpOptions);
	}

	advanceSearch(data: FilterStock): Observable<FilterStock> {
		let url = `${baseUrl}/reports/stock/`;
		return this.http.post<FilterStock>(url, data, this.httpOptions);
	}

}
