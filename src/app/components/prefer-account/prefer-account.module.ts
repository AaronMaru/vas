import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PreferAccountRoutingModule } from './prefer-account-routing.module';
import { PreferAccountListComponent } from './prefer-account-list/prefer-account-list.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [PreferAccountListComponent],
	imports: [
		CommonModule,
		FormsModule,
		PreferAccountRoutingModule,
		NgxPaginationModule,
		ToastrModule.forRoot(),
	],
	providers: [
		ToastrService
	],
})
export class PreferAccountModule { }
