import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]})
export class AppRoutingModule { }
