import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemShowComponent } from './item-show/item-show.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: ItemListComponent,
				data: {
					title: 'Item List',
					breadcrumb: 'List'
				}
			},
			{
				path: 'new',
				component: ItemFormComponent,
				data: {
					title: 'Item New',
					breadcrumb: 'New'
				}
			},
			{
				path: ':id',
				component: ItemFormComponent,
				data: {
					title: 'Item View',
					breadcrumb: 'View'
				}
			},
			{
				path: 'detail/:id',
				component: ItemShowComponent,
				data: {
					title: 'Stock View',
					breadcrumb: 'View'
				}
			},
			{
				path: 'detail/:id/:category',
				component: ItemDetailComponent,
				data: {
					title: 'Stock Detail View',
					breadcrumb: 'View'
				}
			},

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ItemRoutingModule { }
