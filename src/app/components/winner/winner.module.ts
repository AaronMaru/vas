import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { WinnerListComponent } from './winner-list/winner-list.component';
import { WinnerRoutingModule } from './winner-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [WinnerListComponent],
	imports: [
		FormsModule,
		CommonModule,
		NgxPaginationModule,
		WinnerRoutingModule,
		ReactiveFormsModule,
		AngularMultiSelectModule,
		NgxSpinnerModule,
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
	]
})
export class WinnerModule { }
