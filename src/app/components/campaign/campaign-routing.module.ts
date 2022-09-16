import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: CampaignListComponent,
				data: {
					title: 'Campaign List',
					breadcrumb: 'List'
				}
			},
			{
				path: 'new',
				component: CampaignFormComponent,
				data: {
					title: 'Campaign New',
					breadcrumb: 'New'
				}
			},
			{
				path: ':id',
				component: CampaignFormComponent,
				data: {
					title: 'Campaign View',
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
export class CampaignRoutingModule { }
