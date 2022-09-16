import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WinnerListComponent } from './winner-list/winner-list.component';


const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: WinnerListComponent,
				data: {
					title: 'Winner List',
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
export class WinnerRoutingModule { }
