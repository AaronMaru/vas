import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/model/items/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
	selector: 'app-item-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.sass']
})
export class ItemFormComponent implements OnInit, OnDestroy {
	public itemForm: FormGroup;
	public submitted = false;
	public routeTitle: String;
	public item = new Item();

	private taskObserable: Subscription = new Subscription();

	constructor(
		private route: ActivatedRoute, private itemService: ItemService,
		private fb: FormBuilder, private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit() {
		this.itemForm = this.fb.group({
			id: '',
			name: ['', Validators.required],
			remark: '',
			status: 'A',
		});
		let itemId: number;
		this.route.data.subscribe((data: Data) => {
			this.routeTitle = data['title'];
		});

		this.route.params.subscribe(
			params => {
				itemId = params['id'];
			}
		);

		if (itemId != null) {
			this.taskObserable = this.itemService.getItemById(itemId).subscribe((result: any) => {
				this.item = result.data;
				this.itemForm = this.fb.group({
					id: this.item.id,
					name: [this.item.name, Validators.required],
					remark: this.item.remark,
				});
			});
		}
	}

	submit() {

		this.submitted = true;
		if (this.itemForm.valid) {

			if (this.item.id != null) {
				this.itemService.updateItem(this.itemForm.value).subscribe(
					() => {
						this.toastr.success("Item has been updated.");
						this.router.navigate(['/item']);
					}
				);
			} else {
				this.itemService.createItem(this.itemForm.value).subscribe(
					() => {
						this.toastr.success("Item has been created.");
						this.router.navigate(['/item']);
					}
				);
			}

		}

	}

	ngOnDestroy() {
		this.taskObserable.unsubscribe();
	}
	get itemFormControl() {
		return this.itemForm.controls;
	}
}
