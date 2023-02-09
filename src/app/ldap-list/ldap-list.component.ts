import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../model/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {LDAP_users} from "../model/ldap-mock-data";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit {

  displayedColumns: string[] = ['nomComplet','mail','employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private LDAP_USERS = LDAP_users;
  unactivateSelected = false;

  // ngOnInit(): void{
  //   this.dataSource.paginator = this.paginator;
  //   this.getUsers();
  // }

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);

    this.getUsers();
  }

  filterPredicate(data, filter): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getUsers(): void {
    this.dataSource.data = this.LDAP_USERS;
    if(this.unactivateSelected) {
      this.dataSource.data = this.dataSource.data.filter( user =>
        user.active === false
      );
    }
  }

  // applyFilter($event: KeyboardEvent) {
  //
  // }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactivateSelected = $event.checked;
    this.getUsers();
  }
}


