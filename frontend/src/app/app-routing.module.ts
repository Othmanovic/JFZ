// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { SeaManagementComponent } from './components/sea-management/sea-management.component';
import { HandlingManagementComponent } from './components/handling-management/handling-management.component';
import { ReviewerComponent } from './components/reviewer/reviewer.component';
import { FinanceComponent } from './components/finance/finance.component';
import { HrComponent } from './components/hr/hr.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ShipArrivalDetailsComponent } from './components/ship-arrival-history/ship-arrival-details/ship-arrival-details.component';
import { ShipArrivalHistoryComponent } from './components/ship-arrival-history/ship-arrival-history.component';
import { AddShipComponent } from './components/add-ship/add-ship.component';
import { AddPolicyComponent } from './components/admin/add-policy/add-policy.component';
import { PolicyDetailsComponent } from './components/admin/policy-details/policy-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { E3dadComponent } from './components/e3dad/e3dad.component';
import { PolicyListComponent } from './components/e3dad/policy-list/policy-list.component';
import { EditPolicyComponent } from './components/admin/edit-policy/edit-policy.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { BillPageComponent } from './components/e3dad/bill-page/bill-page.component';
import { DeniedBillsComponent } from './components/e3dad/denied-bills/denied-bills.component';
import { EditBillComponent } from './components/e3dad/edit-bill/edit-bill.component';
import { BayanDashboardComponent } from './components/bayan-dashboard/bayan-dashboard.component';
import { WakeelComponent } from './components/wakeel/wakeel.component';
import { TowingPilotageListComponent } from './components/ship-accounting/towing-pilotage-list/towing-pilotage-list.component';
import { TowingPilotageCreateComponent } from './components/ship-accounting/towing-pilotage-create/towing-pilotage-create.component';
import { FeesDashboardComponent } from './components/ship-accounting/fees-dashboard/fees-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  // {
  //   path: 'sea_management',
  //   component: SeaManagementComponent,
  //   canActivate: [AuthGuard],
  //   data: { role: 'sea_management' }, // Protect routes based on role
  //   children: [
  //     { path: 'ship-arrival-form', component: SeaManagementComponent },
  //     // { path: 'ship-arrival-history', component: ShipArrivalHistoryComponent },
  //     // { path: 'ship-arrival-details/:id', component: ShipArrivalDetailsComponent },
  //     { path: 'add-ship', component: AddShipComponent },
  //     // Add more child routes here
  //   ]
  // },

  { path: 'ship-arrival-history', component: ShipArrivalHistoryComponent, canActivate: [AuthGuard], },

  { path: 'ship-arrival-details/:id', component: ShipArrivalDetailsComponent, canActivate: [AuthGuard], },
  { path: 'sea_management', component: SeaManagementComponent, canActivate: [AuthGuard], },
  { path: 'add-ship', component: AddShipComponent, canActivate: [AuthGuard], },
  { path: 'wakeel', component: WakeelComponent, canActivate: [AuthGuard], },
  { path: 'towing-pilotage', component: TowingPilotageListComponent, canActivate: [AuthGuard], },
  { path: 'towing-pilotage-create', component: TowingPilotageCreateComponent, canActivate: [AuthGuard], },
  { path: 'fees-dashboard', component: FeesDashboardComponent, canActivate: [AuthGuard], },
  { path: 'bayan', component: BayanDashboardComponent },


  { path: 'admin/add-policy/:id', component: AddPolicyComponent, canActivate: [AuthGuard], },
  {
    path: 'admin/policy-details/:id', component: PolicyDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]
  },
  { path: 'edit-policy/:id', component: EditPolicyComponent },


  { path: 'handling_management', component: HandlingManagementComponent, canActivate: [AuthGuard], },
  { path: 'reviewer', component: ReviewerComponent, canActivate: [AuthGuard], },
  { path: 'finance', component: FinanceComponent, canActivate: [AuthGuard], },
  { path: 'hr', component: HrComponent, canActivate: [AuthGuard], },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], },
  { path: 'e3dad', component: E3dadComponent, canActivate: [AuthGuard] },
  { path: 'e3dad/ships/:id/policies', component: PolicyListComponent, canActivate: [AuthGuard] },
  { path: 'e3dad/denied-bills', component: DeniedBillsComponent },
  { path: 'edit-bill/:id', component: EditBillComponent },


  { path: 'bill', component: BillPageComponent },



  { path: 'home', component: HomeComponent }, // Generic Home Page
  { path: 'not-found', component: NotFoundComponent }, // Wildcard route for a 404 page
  { path: '', redirectTo: '/not-found', pathMatch: 'full' }, // Redirect root to home
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
