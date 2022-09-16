import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReportListComponent } from './components/vasreport/report-list/report-list.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		SidebarComponent,
		LoginComponent,
		ReportListComponent,
		HomeComponent
	],
	imports: [
		ToastrModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en-US',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		AuthService,
		AuthGuard,
		{provide: LocationStrategy, useClass: HashLocationStrategy}
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}
