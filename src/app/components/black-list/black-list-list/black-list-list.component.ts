import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BlackList } from 'src/app/model/black-list';
import { BlackListUpload } from 'src/app/model/black-list-upload';
import { BlackListService } from 'src/app/services/black-list.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-black-list-list',
	templateUrl: './black-list-list.component.html',
	styleUrls: ['./black-list-list.component.sass']
})
export class BlackListListComponent implements OnInit, OnDestroy {

	public routeTitle: String;
	public term: string = '';
	public blackLists: BlackList[] = [];

	public totoalLength: any;
	public page: number = 1;
	private fileName = 'black_list.xlsx';
	private blackListUpload = new BlackListUpload();

	private taskObserable: Subscription = new Subscription();
	constructor(private route: ActivatedRoute, private toastr: ToastrService,
		private blackListService: BlackListService, private router: Router
	) { }

	ngOnInit(): void {
		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.taskObserable = this.blackListService.getBlackLists(this.term).subscribe((result: any) => {
			this.blackLists = result.data;
			this.totoalLength = result.length;
		});
	}

	downLoadTemplate() {

		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([

		], { header: ["blackListId", "remark"] });

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

			this.blackListUpload.data = (XLSX.utils.sheet_to_json(ws));

			this.blackListService.uploadBlackList(this.blackListUpload).subscribe(
				() => {
					this.toastr.success("Black List has been uploaded.");
					this.taskObserable = this.blackListService.getBlackLists(this.term).subscribe(
						(result: any) => {
							this.blackLists = result.data;
							this.totoalLength = result.length;
						});
				}
			);
		}
		reader.readAsBinaryString(target.files[0]);
	}

	deleteBlackList(id: number) {
		this.blackListService.delete(id).subscribe(
			(result: any) => {
				this.toastr.success("Black List has been delete");
					this.taskObserable = this.blackListService.getBlackLists(this.term).subscribe(
						(result: any) => {
							this.blackLists = result.data;
							this.totoalLength = result.length;
						});
			});
	}

	search() {
		this.taskObserable = this.blackListService.getBlackLists(this.term).subscribe((result: any) => {
			this.blackLists = result.data

		});
	}

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}

}
