import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campaign } from '../model/campaigns/Campaign';
import { getJson } from 'src/helpers/localstore';
import { SearchCampaign } from '../model/campaigns/SearchCampaign';
import { PoolHisotry } from '../model/campaigns/PoolHistory';

const { baseUrl } = environment;
const AUTH_KEY = 'auth';

@Injectable({
	providedIn: 'root'
})
export class CampaignService {

	private httpOptions = {}

	constructor(private http: HttpClient) {
		const { accessToken, expirationInMs } = getJson(AUTH_KEY);
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}).set('Authorization', 'Bearer ' + accessToken)
		}
	}

	getCampaigns(search: string): Observable<Campaign> {
		let url = `${baseUrl}/campaigns`;
		if (search !== '') {
			url = `${baseUrl}/campaigns?name=${search}`;
		}

		return this.http.get<Campaign>(url, this.httpOptions);
	}

	getCampaignsById(id: number): Observable<Campaign> {
		const url = `${baseUrl}/campaigns/${id}`;
		return this.http.get<Campaign>(url, this.httpOptions);
	}

	createCampaign(item: Campaign): Observable<Campaign> {
		const url = `${baseUrl}/campaigns`;
		return this.http.post<Campaign>(url, item, this.httpOptions);
	}

	updateCampaign(item: Campaign): Observable<Campaign> {
		const url = `${baseUrl}/campaigns`;
		return this.http.put<Campaign>(url, item, this.httpOptions);
	}

	searchCampaign(data: SearchCampaign): Observable<SearchCampaign> {
		const url = `${baseUrl}/campaigns/search`;
		return this.http.post<SearchCampaign>(url, data, this.httpOptions);
	}

	getPoolHistory(id: number): Observable<PoolHisotry> {
		const url = `${baseUrl}/campaigns/${id}/history`;
		return this.http.get<PoolHisotry>(url, this.httpOptions);
	}

	getPool(id: number): Observable<any> {
		const url = `${baseUrl}/campaigns/${id}/pool`;
		return this.http.get<any>(url, this.httpOptions);
	}
}
