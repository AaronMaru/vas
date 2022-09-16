import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Agent } from 'src/app/model/agent';
import { Branch } from 'src/app/model/campaigns/branch';
import { Campaign } from 'src/app/model/campaigns/Campaign';
import { Item } from 'src/app/model/items/item';
import { BranchService } from 'src/app/services/branch.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { ItemService } from 'src/app/services/item.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-campaign-form',
	templateUrl: './campaign-form.component.html',
	styleUrls: ['./campaign-form.component.sass']
})
export class CampaignFormComponent implements OnInit, OnDestroy {

	public campaignForm: FormGroup;
	submitted = false;

	public branchList: Branch[] = [];
	public branches = [];
	public branchSettings = {};

	public transactionTypeList = [];
	public transactionTypes = [];
	public transactionTypeSettings = {};

	public routeTitle: String;
	public campaign = new Campaign("AGENT");
	private taskObserable: Subscription = new Subscription();
	public items: Item[] = [];
	public item = new Item();

	private fileName = 'agent_list.xlsx';
	public agents: Agent[] = [];
	public baseOn: string;
	public campaignId: number;

	constructor(private route: ActivatedRoute, private itemSV: ItemService, private router: Router,
		private campaignSV: CampaignService, private fb: FormBuilder, private toastr: ToastrService,
		private branchService: BranchService
	) { }
	ngOnInit(): void {
		let date = new Date();
		this.campaignForm = this.fb.group({
			id: '',
			name: ['', Validators.required],
			item: [this.campaign.item?.id, Validators.required],
			transactionTypes: ['', Validators.required],
			baseOn: ['BRANCH'],
			branches: [],
			agents: [],
			remark: '',
			startDate: [new Date().toISOString().slice(0, 10), Validators.required],
			endDate: [new Date().toISOString().slice(0, 10), Validators.required],
			startTime: ['', Validators.required],
			endTime: ['', Validators.required],
			// sequence: 'M',
			currency: 'KHR',
			fromAmount: ['', Validators.required],
			toAmount: ['', Validators.required],
			estimateCustomer: ['', Validators.required],
			channel: 'AGENT',
			status: 'A',
			forAmk: false
		});


		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});
		this.route.params.subscribe(
			params => {
				this.campaignId = params['id'];
			}
		);

		this.taskObserable = this.branchService.getBranches("").subscribe((result: any) => {
			this.branchList = result.data;
		});

		if (this.campaignId != null) {
			this.taskObserable = this.campaignSV.getCampaignsById(this.campaignId).subscribe((result: any) => {
				this.campaign = result.data;
				this.branches = result.data.branches;
				console.log(this.campaign);

				this.transactionTypes = result.data.transactionTypes;
				this.item = result.data.item;

				this.taskObserable = this.itemSV.getItems("").subscribe((result: any) => {
					this.items = result.data;
				});

				this.campaignForm = this.fb.group({
					id: this.campaign.id,
					name: [this.campaign.name, Validators.required],
					item: this.campaign.item.id,
					transactionTypes: [this.campaign.transactionTypes, Validators.required],
					baseOn: [this.campaign.baseOn],
					branches: [this.campaign.branches],
					agents: [this.campaign.agents],
					remark: this.campaign.remark,
					startDate: [formatDate(this.campaign.startDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
					endDate: [formatDate(this.campaign.endDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
					startTime: [this.campaign.startTime, Validators.required],
					endTime: [this.campaign.endTime, Validators.required],
					// sequence: this.campaign.sequence,
					fromAmount: [this.campaign.fromAmount, Validators.required],
					toAmount: [this.campaign.toAmount, Validators.required],
					estimateCustomer: [this.campaign.estimateCustomer, Validators.required],
					channel: this.campaign.channel.itemName,
					status: this.campaign.status,
					forAmk: this.campaign.forAmk
				});
			});
		} else {
			this.taskObserable = this.itemSV.getItems("").subscribe((result: any) => {
				this.items = result.data;
				this.item = this.items[0];
				this.campaignForm = this.fb.group({
					id: '',
					name: ['', Validators.required],
					item: [this.campaign.item?.id, Validators.required],
					transactionTypes: ['', Validators.required],
					baseOn: ['BRANCH'],
					branches: [],
					agents: [],
					remark: '',
					startDate: [new Date().toISOString().slice(0, 10), Validators.required],
					endDate: [new Date(date.setMonth(date.getMonth() + 1)).toISOString().slice(0, 10), Validators.required],
					startTime: ['', Validators.required],
					endTime: ['', Validators.required],
					// sequence: 'M',
					fromAmount: ['', Validators.required],
					toAmount: ['', Validators.required],
					estimateCustomer: ['', Validators.required],
					channel: 'AGENT',
					status: 'A',
					forAmk: false
				});
			});
		}


		// --------------------transaction type multi select
		this.transactionTypeList = [
			{ "id": "transfer", "itemName": "Transfer" },
			{ "id": "receive", "itemName": "Receive" },
			{ "id": "withdrawal", "itemName": "Withdrawal" },
			{ "id": "deposit", "itemName": "Deposit" },
			{ "id": "ft_own_account", "itemName": "FT Own Account" },
			{ "id": "ft_other_agent_account", "itemName": "FT Other Agent Accounts" },
			{ "id": "loan_repayment", "itemName": "Loan Repayment" },
			{ "id": "bill_payment", "itemName": "Bill Payment" },
			{ "id": "transfer_to_other_account", "itemName": "Transfer to Other Banks" },
			{ "id": "transfer_to_bakong_account", "itemName": "Transfer to Bakong Wallet" },
			{ "id": "direct_phone_top_account", "itemName": "Direct Phone Top Up" },
			{ "id": "pinbase_phone_top_account", "itemName": "Pinbase Phone Top Up" },
			{ "id": "bakong_deposit", "itemName": "Bakong Deposit" },
			{ "id": "bakong_cash_in", "itemName": "Bakong Cash In" },
			{ "id": "bakong_cash_out", "itemName": "Bakong Cash Out" },
		];
		this.transactionTypeSettings = {
			singleSelection: false,
			text: "Select Transaction Type",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			classes: "myclass custom-class",
			badgeShowLimit: 5
		};
		// --------------------branch multi select
		// this.branchList = [
		// 	{ "id": "PP", "itemName": "Phnom Penh" },
		// 	{ "id": "SR", "itemName": "Siem Reap" },
		// 	{ "id": "KD", "itemName": "Kandal" },

		// ];
		this.branchSettings = {
			singleSelection: false,
			text: "Select Branch",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			classes: "myclass custom-class",
			badgeShowLimit: 5
		};
	}

	submit() {

		this.submitted = true;
		if (this.campaignForm.valid) {
			if (this.campaign.id == null) {
				this.campaignSV.createCampaign(this.campaignForm.value).subscribe(
					(res: any) => {
						this.toastr.success("Campaign has been created.");
						this.router.navigate(['/campaign']);
					},
					(err: any) => {
						this.toastr.error("Item alreay taken.");
					});

			} else {
				this.campaignSV.updateCampaign(this.campaignForm.value).subscribe(
					() => {
						this.toastr.success("Campaign has been updated.");
						this.router.navigate(['/campaign']);
					}
				);
			}
		}
	}

	get campaignFormControl() {
		return this.campaignForm.controls;
	}

	onItemSelect(item: any) {
	}
	OnItemDeSelect(item: any) {
	}
	onSelectAll(items: any) {
	}
	onDeSelectAll(items: any) {
	}

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}

	downLoadTemplate() {

		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([

		], { header: ["agentTerminal"] });

		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		XLSX.writeFile(wb, this.fileName);

	}

	downLoadExistingTemplate() {

		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.campaign.agents, { header: ["agentTerminal"] });

		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		XLSX.writeFile(wb, this.fileName);

	}

	onFileChange(event: any) {

		const target: DataTransfer = <DataTransfer>(event.target);

		if (target.files.length !== 1) {
			throw new Error('Cannot use multiple files');
		}

		const reader: FileReader = new FileReader();

		reader.onload = (e: any) => {
			const bstr: String = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			this.agents = (XLSX.utils.sheet_to_json(ws));
			this.campaignForm.controls['agents'].setValue(this.agents)

			/* this.blackListService.uploadBlackList(this.blackListUpload).subscribe(
				() => {
					this.toastr.success("Hello, I'm the toastr message.");
					setTimeout(() => {
						// this.router.navigate([this.route.url]);
					}, 1000);
				}
			); */
		}
		reader.readAsBinaryString(target.files[0]);
	}

	onChange(deviceValue) {
		this.campaignForm.controls['baseOn'].setValue(deviceValue);
	}
}
