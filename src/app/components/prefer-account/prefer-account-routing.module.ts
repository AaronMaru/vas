import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferAccountListComponent } from './prefer-account-list/prefer-account-list.component';
import { PreferAccountModule } from './prefer-account.module';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: PreferAccountListComponent,
				data: {
					title: 'Prefer Account',
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
export class PreferAccountRoutingModule { }
