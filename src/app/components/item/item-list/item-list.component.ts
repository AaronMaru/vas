import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/model/items/item';
import { ItemService } from 'src/app/services/item.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit, OnDestroy {

	public routeTitle: String;
	public items: Item[] = [];
	public term: string = '';
	private taskObserable: Subscription;
	private fileName= 'vas-item.xlsx';

	totoalLength:any;
	page:number=1;

	constructor(private route: ActivatedRoute, private itemService: ItemService) { }
	ngOnInit() {
		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});
		this.taskObserable = this.itemService.getItems(this.term).subscribe((result: any) => {
			this.items = result.data;
			this.totoalLength = result.length;
			this.totoalLength = result.length;
		});

	}

	search() {
		this.taskObserable = this.itemService.getItems(this.term).subscribe((result: any) => {
			this.items = result.data

		});

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


	delteItem(item: Item) {
		this.itemService.deleteItem(item).subscribe(() => this.items = this.items.filter((i) => i.id !== item.id));
	}

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}
}
