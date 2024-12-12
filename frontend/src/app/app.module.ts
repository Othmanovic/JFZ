import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { SeaManagementComponent } from './components/sea-management/sea-management.component';
import { HandlingManagementComponent } from './components/handling-management/handling-management.component';
import { ReviewerComponent } from './components/reviewer/reviewer.component';
import { FinanceComponent } from './components/finance/finance.component';
import { HrComponent } from './components/hr/hr.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ShipArrivalHistoryComponent } from './components/ship-arrival-history/ship-arrival-history.component';
import { ShipArrivalDetailsComponent } from './components/ship-arrival-history/ship-arrival-details/ship-arrival-details.component';
import { SeaLayoutComponent } from './components/sea-layout/sea-layout.component';
import { AddShipComponent } from './components/add-ship/add-ship.component';
import { SideNavComponent } from './components/side-nav/side-nav.component'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddPolicyComponent } from './components/admin/add-policy/add-policy.component';
import { PolicyDetailsComponent } from './components/admin/policy-details/policy-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { E3dadComponent } from './components/e3dad/e3dad.component';
import { PolicyListComponent } from './components/e3dad/policy-list/policy-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    SeaManagementComponent,
    HandlingManagementComponent,
    ReviewerComponent,
    FinanceComponent,
    HrComponent,
    HeaderComponent,
    ShipArrivalHistoryComponent,
    ShipArrivalDetailsComponent,
    SeaLayoutComponent,
    AddShipComponent,
    SideNavComponent,
    AddPolicyComponent,
    PolicyDetailsComponent,
    NotFoundComponent,
    HomeComponent,
    E3dadComponent,
    PolicyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
