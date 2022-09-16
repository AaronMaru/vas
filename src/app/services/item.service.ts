import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getJson } from 'src/helpers/localstore';
import { Item } from '../model/items/item';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
	providedIn: 'root'
})
export class ItemService {

	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}


	getItems(search: string): Observable<Item> {
		let url = `${baseUrl}/items`;
		if (search !== '') {
			url = `${baseUrl}/items?name=${search}`;
		}

		return this.http.get<Item>(url, this.httpOptions);
	}

	getItemById(id: number): Observable<Item> {
		const url = `${baseUrl}/items/${id}`;
		return this.http.get<Item>(url, this.httpOptions);
	}

	createItem(item: any): Observable<Item> {
		const url = `${baseUrl}/items`;
		return this.http.post<Item>(url, item, this.httpOptions);
	}

	deleteItem(item: Item): Observable<Item> {
		const url = `${baseUrl}/items/${item.id}`;
		return this.http.delete<Item>(url);
	}

	updateItem(item: any): Observable<any> {
		const url = `${baseUrl}/items`;
		return this.http.put<any>(url, item, this.httpOptions);
	}
}
