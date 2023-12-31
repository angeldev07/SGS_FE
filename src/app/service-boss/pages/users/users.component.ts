import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDTO} from "../../../shared/user.service";
import {UsersService} from "../../service/users.service";
import {TableModule} from "primeng/table";
import {AvatarModule} from "primeng/avatar";
import {AddEditUserComponent} from "../../components/add-edit-user/add-edit-user.component";
import { UserFullDTO } from '../../interfaces';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AddEditUserComponent ,TableModule,AvatarModule],
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {
  usersList = signal<UserFullDTO[]>([])
  selectedUser: UserFullDTO | null = null
  colsHeaders = signal([ '', 'Nombre completo', 'Dependencia', 'Correo', 'Cargo actual','Acciones'])
  modalVisible = false
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.usersList.set(users)
      }
    })
  }

  openEditUserModal(user: UserFullDTO) { 
    this.selectedUser = {...user}
    this.modalVisible = true
  }

}
