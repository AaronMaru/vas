import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getJson } from 'src/helpers/localstore';
import { ItemDetail } from '../model/items/item-detail';
import { ItemDetailUpload } from '../model/items/ItemDetailUpload';
import { Stock } from '../model/items/stock';
const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
	providedIn: 'root'
})
export class ItemDetailService {

	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

	getStocks(id: number): Observable<Stock> {
		let url = `${baseUrl}/items/detail/${id}`;
		return this.http.get<Stock>(url, this.httpOptions);
	}

	getItemDetail(id: number, category: string): Observable<ItemDetail> {
		let url = `${baseUrl}/items/detail/${id}/${category}`;
		return this.http.get<ItemDetail>(url, this.httpOptions);
	}

	addItemDetails(upload: ItemDetailUpload): Observable<ItemDetailUpload> {
		const url = `${baseUrl}/items/detail`;
		return this.http.post<ItemDetailUpload>(url, upload, this.httpOptions);
	}
}
