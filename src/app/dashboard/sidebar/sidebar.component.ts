import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {sidebarItems, Item} from "./sidebarItems.const";
import {SidebarService} from "./sidebar.service";
import {LoginService} from "../../auth/services/login.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  items: Item[] = []

  constructor(
    private sidebarService: SidebarService,
    private auth: LoginService,
    private currentUser: UserService
  ) {
  }

  ngOnInit(): void {
    this.currentUser.currentUser.subscribe({
      next: res => {
        this.items = sidebarItems
          .filter(item => item.rol === res.rol)
          .map(item => item.items)[0]
      }
    })

  }

  get open (): boolean {
    return this.sidebarService.open
  }

  logoutFn(){
    this.currentUser.clearUser()
    this.auth.logout()
  }

  close(){
    this.sidebarService.openSidebar(false)
  }

}
