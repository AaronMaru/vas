import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/model/items/item';
import { ItemDetailUpload } from 'src/app/model/items/ItemDetailUpload';
import { Stock } from 'src/app/model/items/stock';
import { ItemDetailService } from 'src/app/services/item-detail.service';
import { ItemService } from 'src/app/services/item.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-item-show',
	templateUrl: './item-show.component.html',
	styleUrls: ['./item-show.component.sass']
})
export class ItemShowComponent implements OnInit, OnDestroy {

	public submitted = false;
	public routeTitle: String;
	public item = new Item();
	public itemDetailUpload = new ItemDetailUpload();
	public stocks: Stock[] = [];

	private taskObserable: Subscription = new Subscription();
	private fileName = 'stock_item_template.xlsx';
	public totoalLength: any;
	public page: number = 1;
	public itemId: number;
	constructor(
		private route: ActivatedRoute, private itemService: ItemService, private router: Router,
		private toastr: ToastrService, private itemDetailService: ItemDetailService
	) { }

	ngOnInit(): void {

		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.route.params.subscribe(
			params => {
				this.itemId = params['id'];
			}
		);

		this.taskObserable = this.itemService.getItemById(this.itemId).subscribe((result: any) => {
			this.item = result.data;
		});

		this.taskObserable = this.itemDetailService.getStocks(this.itemId).subscribe((result: any) => {
			this.stocks = result.data;
		});
	}

	downLoadTemplate() {

		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([

		], { header: ["name", "category", "currency", "type", "quantity", "winDate", "phoneNumber"] });

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

			this.itemDetailUpload.itemId = this.item.id;
			this.itemDetailUpload.data = (XLSX.utils.sheet_to_json(ws));

			this.itemDetailService.addItemDetails(this.itemDetailUpload).subscribe(
				(res: any) => {
					this.toastr.success("Stock has been uploaded.");
					this.taskObserable = this.itemDetailService.getStocks(this.itemId).subscribe((result: any) => {
						this.stocks = result.data;
					});
				},
				(err: any) => {
					console.log(err.error.message);

					this.toastr.error(err.error.message);
				});
		}
		reader.readAsBinaryString(target.files[0]);
	}

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}

	excelDateToJSDate(excelDate) {
		var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
		var converted_date = date.toISOString().split('T')[0];
		return converted_date;
	}
}
