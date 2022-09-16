import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/model/campaigns/Campaign';
import { PoolHisotry } from 'src/app/model/campaigns/PoolHistory';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
	selector: 'app-campaign-list',
	templateUrl: './campaign-list.component.html',
	styleUrls: ['./campaign-list.component.sass']
})
export class CampaignListComponent implements OnInit, OnDestroy {

	public currentPool: number = 0;
	public routeTitle: String;
	private taskObserable: Subscription;
	public term: string = '';
	public campaigns: Campaign[] = [];
	totoalLength: any;
	page: number = 1;
	poolPage: number = 1;
	public histories: PoolHisotry[] = [];

	public campaignForm: FormGroup;
	submitted = false;

	constructor(private route: ActivatedRoute, private campaignService: CampaignService, private fb: FormBuilder) { }

	ngOnInit(): void {

		this.campaignForm = this.fb.group({
			startDate: [new Date().toISOString().slice(0, 10), Validators.required],
			endDate: [new Date().toISOString().slice(0, 10), Validators.required],
			name: '',
		});

		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.taskObserable = this.campaignService.getCampaigns(this.term).subscribe((result: any) => {
			this.campaigns = result.data;
			this.totoalLength = result.length;
		});
	}

	advanceSearch() {

		this.submitted = true;
		if (this.campaignForm.valid) {
			this.taskObserable = this.campaignService.searchCampaign(this.campaignForm.value).subscribe((result: any) => {
				this.campaigns = result.data;
			});
		}

	}

	get campaignFormControl() {
		return this.campaignForm.controls;
	}

	poolHostory(campaignId) {
		this.taskObserable = this.campaignService.getPool(campaignId).subscribe((result: any) => {
			this.currentPool = result.data;
		});
		this.taskObserable = this.campaignService.getPoolHistory(campaignId).subscribe((result: any) => {
			this.histories = result.data;
		});
	}

	checkValue(campaign: Campaign){

	 }

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}
}

