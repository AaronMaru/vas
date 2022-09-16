import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Prefer } from 'src/app/model/prefer';
import { PreferUpload } from 'src/app/model/prefer-upload';
import { PreferService } from 'src/app/services/prefer.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-prefer-account-list',
	templateUrl: './prefer-account-list.component.html',
	styleUrls: ['./prefer-account-list.component.sass']
})
export class PreferAccountListComponent implements OnInit {

	public routeTitle: String;
	public perfers: Prefer[] = [];
	public term: string = '';

	private fileName = 'prefer_account.xlsx';
	private preferUpload = new PreferUpload();
	public page: number = 1;
	public totoalLength: any;

	private taskObserable: Subscription = new Subscription();
	constructor(private route: ActivatedRoute, private preferService: PreferService, private toastr: ToastrService,) { }

	ngOnInit(): void {
		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.taskObserable = this.preferService.getPerferLists(this.term).subscribe((result: any) => {
			this.perfers = result.data;
			this.totoalLength = result.length;
		});
	}

	downLoadTemplate() {

		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([

		], { header: ["accountId", "remark"] });

		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		XLSX.writeFile(wb, this.fileName);

	}

	search() {
		this.taskObserable = this.preferService.getPerferLists(this.term).subscribe((result: any) => {
			this.perfers = result.data

		});
	}

	deletePreferList(id: number) {
		this.preferService.delete(id).subscribe(
			(result: any) => {
				this.toastr.success("Black List has been delete");
					this.taskObserable = this.preferService.getPerferLists(this.term).subscribe(
						(result: any) => {
							this.perfers = result.data;
							this.totoalLength = result.length;
						});
			});
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

			this.preferUpload.data = (XLSX.utils.sheet_to_json(ws));

			this.preferService.uploadPrefereAccount(this.preferUpload).subscribe(
				() => {
					this.toastr.success("Prefer List has been uploaded.");
					this.taskObserable = this.preferService.getPerferLists(this.term).subscribe((result: any) => {
						this.perfers = result.data;
						this.totoalLength = result.length;
					});
				}
			);
		}
		reader.readAsBinaryString(target.files[0]);
	}
}
