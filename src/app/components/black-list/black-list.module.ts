import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlackListRoutingModule } from './black-list-routing.module';
import { BlackListListComponent } from './black-list-list/black-list-list.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [BlackListListComponent],
	imports: [
		CommonModule,
		FormsModule,
		BlackListRoutingModule,
		NgxPaginationModule,
		ToastrModule.forRoot(),
	],
	providers: [
		ToastrService
	],
})
export class BlackListModule { }
