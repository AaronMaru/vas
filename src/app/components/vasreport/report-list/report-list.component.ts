import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/model/items/item';
import { ItemDetail } from 'src/app/model/items/item-detail';
import { ItemService } from 'src/app/services/item.service';
import { ReportService } from 'src/app/services/report.service';
import * as XLSX from 'xlsx';
@Component({
	selector: 'app-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.sass']
})
export class ReportListComponent implements OnInit, OnDestroy {

	public itemDetails: ItemDetail[] = [];
	public items: Item[] = [];
	public item = new Item;
	private taskObserable: Subscription = new Subscription();

	public campaignForm: FormGroup;
	public submitted = false;
	private fileName = 'vas-stock.xlsx';
	constructor(
		private route: ActivatedRoute, private router: Router, private reportSV: ReportService,
		private fb: FormBuilder, private itemSV: ItemService
	) { }

	ngOnInit(): void {
		this.campaignForm = this.fb.group({
			item: '',
			status: ''
		});
		this.taskObserable = this.itemSV.getItems("").subscribe((result: any) => {
			this.items = result.data;
			this.item = this.items[0];
			this.campaignForm = this.fb.group({
				item: this.item.id,
				status: ''
			});

			this.taskObserable = this.reportSV.advanceSearch(this.campaignForm.value).subscribe((result: any) => {
				this.itemDetails = result.data;
			});
		});
	}

	advanceSearch() {
		this.submitted = true;
		if (this.campaignForm.valid) {
			this.taskObserable = this.reportSV.advanceSearch(this.campaignForm.value).subscribe((result: any) => {
				this.itemDetails = result.data;
			});
		}
	}

	get campaignFormControl() {
		return this.campaignForm.controls;
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

}
