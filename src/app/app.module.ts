import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { PostComponent } from "./components/post/post.component";
import { MatSelectModule } from "@angular/material/select";
import { PaginationComponent } from "./components/controls/pagination/pagination.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LimitComponent } from "./components/controls/limit/limit.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingInterceptor } from "./loading.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PaginationComponent,
    PostDetailsComponent,
    DashboardComponent,
    LimitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
