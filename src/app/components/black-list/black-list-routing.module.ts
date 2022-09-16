import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackListListComponent } from './black-list-list/black-list-list.component';


const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: BlackListListComponent,
				data: {
					title: 'Black List',
					breadcrumb: 'List'
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BlackListRoutingModule { }
