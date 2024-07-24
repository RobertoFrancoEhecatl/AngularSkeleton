import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuard } from 'src/app/Guard/Auth/auth.guard';
import { RoleGuard } from 'src/app/Guard/Role/role.guard';
import { LogsComponent } from './Components/logs/logs.component';
import { UsersComponent } from './Components/users/users.component';
import { AddEditUserComponent } from './Components/users/add-edit-user/add-edit-user.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    /*     canActivate: [AuthGuard],
     */ children: [
      {
        path: 'logs',
        component: LogsComponent,
        /*         canActivate: [RoleGuard]
         */
      },
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            component: UsersComponent,
          },
          {
            path: 'alta-usuario',
            component: AddEditUserComponent,
          },
          {
            path: 'editar-usuario',
            component: AddEditUserComponent,
          },
        ],
      },
    ],
  },
  /* {
    path: "**",
    redirectTo: "forgot-password"
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
