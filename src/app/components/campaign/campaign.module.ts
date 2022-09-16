import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [CampaignListComponent, CampaignFormComponent],
	imports: [
		ToastrModule.forRoot(),
		CommonModule,
		CampaignRoutingModule,
		NgxPaginationModule,
		AngularMultiSelectModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	providers: [
		ToastrService
	],
})
export class CampaignModule { }
