import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReportListComponent } from './components/vasreport/report-list/report-list.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		data: {
			breadcrumb: 'Login'
		},
	},
	{
		path: 'logout',
		component: LoginComponent,
		data: {
			breadcrumb: 'Logout'
		},
	},
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'item',
				loadChildren: () =>
					import('./components/item/item.module').then(m => m.ItemModule),
				data: {
					breadcrumb: 'Item',
					role: 'ROLE_USER'
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'campaign',
				loadChildren: () =>
					import('./components/campaign/campaign.module').then(m => m.CampaignModule),
				data: {
					breadcrumb: 'Campaign',
					role: 'ROLE_USER',
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'winner',
				loadChildren: () =>
					import('./components/winner/winner.module').then(m => m.WinnerModule),
				data: {
					breadcrumb: 'Winner',
					role: 'ROLE_USER'
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'prefer-account',
				loadChildren: () =>
					import('./components/prefer-account/prefer-account.module').then(m => m.PreferAccountModule),
				data: {
					breadcrumb: 'Prefer Account',
					role: 'ROLE_USER'
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'black-list',
				loadChildren: () =>
					import('./components/black-list/black-list.module').then(m => m.BlackListModule),
				data: {
					breadcrumb: 'Black List',
					role: 'ROLE_USER'
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'report/stock',
				component: ReportListComponent,
				data: {
					breadcrumb: 'Report List',
					role: 'ROLE_USER'
				},
				canActivate: [AuthGuard]
			}
		]
	},
	{ path: '', redirectTo: 'campaign', pathMatch: 'full' },
	{ path: '#/', redirectTo: 'campaign', pathMatch: 'full' },
	{ path: '**', redirectTo: 'campaign' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
