import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Branch } from 'src/app/model/campaigns/branch';
import { Winner } from 'src/app/model/winner';
import { BranchService } from 'src/app/services/branch.service';
import { WinnerService } from 'src/app/services/winner.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-winner-list',
	templateUrl: './winner-list.component.html',
	styleUrls: ['./winner-list.component.sass']
})
export class WinnerListComponent implements OnInit, OnDestroy {

	public routeTitle: string;
	public term: string = '';

	private taskObserable: Subscription;
	public winners: Winner[] = [];

	public totoalLength: any;
	public page: number = 1;

	public branchList: Branch[] = [];
	public branches = [];
	public branchSettings = {};
	public type: string;

	private fileName = 'vas-winner.xlsx';

	public winnerForm: FormGroup;
	submitted = false;

	constructor(private route: ActivatedRoute, private winnerSV: WinnerService, private branchService: BranchService,
		private fb: FormBuilder, private spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.spinner.show();
		this.winnerForm = this.fb.group({
			fromDate: [new Date().toISOString().slice(0, 10), Validators.required],
			toDate: [new Date().toISOString().slice(0, 10), Validators.required],
			branches: [],
			type: '',
			term: ''
		});

		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.taskObserable = this.branchService.getBranches("").subscribe((result: any) => {
			this.branchList = result.data;
		});

		this.taskObserable = this.winnerSV.getWinner(this.term).subscribe((res: any) => {
			this.winners = res.data;
			setTimeout(() => {
				this.spinner.hide();
			});
		});

		this.branchList = [
		];
		this.branchSettings = {
			singleSelection: true,
			text: "Select Branch",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			classes: "myclass custom-class",
			badgeShowLimit: 5
		};
	}

	submit() {
		this.spinner.show();
		this.taskObserable = this.winnerSV.searchWinner(this.winnerForm.value).subscribe((res: any) => {
			this.winners = res.data;
			console.log(this.winners);

			setTimeout(() => {
				this.spinner.hide();
			});
		});
	}

	onItemSelect(branch: any) {

	}
	OnItemDeSelect(item: any) {
	}
	onSelectAll(items: any) {
	}
	onDeSelectAll(items: any) {

	}

	exportexcel(): void {
		let element = document.getElementById('excel-table');
		const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
	}

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}

	get winnerFormControl() {
		return this.winnerForm.controls;
	}
}
