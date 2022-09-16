import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemShowComponent } from './item-show/item-show.component';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [ItemListComponent, ItemFormComponent, ItemShowComponent, ItemDetailComponent],
	imports: [
		ToastrModule.forRoot(),
		CommonModule,
		FormsModule,
		NgxPaginationModule,
		ItemRoutingModule,
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
export class ItemModule { }
