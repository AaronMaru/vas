import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ItemDetail } from 'src/app/model/items/item-detail';
import { ItemDetailService } from 'src/app/services/item-detail.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
	selector: 'app-item-detail',
	templateUrl: './item-detail.component.html',
	styleUrls: ['./item-detail.component.sass']
})
export class ItemDetailComponent implements OnInit {

	public routeTitle: String;
	public totoalLength: any;
	public page: number = 1;
	public itemDetails: ItemDetail[] = [];
	private taskObserable: Subscription = new Subscription();

	public itemId: number;
	public category: string;

	constructor(
		private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
		private itemDetailService: ItemDetailService
	) { }

	ngOnInit(): void {

		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.route.params.subscribe(
			params => {
				this.itemId = params['id'];
				this.category = params['category'];
			}
		);

		this.taskObserable = this.itemDetailService.getItemDetail(this.itemId, this.category).subscribe((result: any) => {
			this.itemDetails = result.data;
			this.totoalLength = result.length;
			this.totoalLength = result.length;
		});


	}

}
