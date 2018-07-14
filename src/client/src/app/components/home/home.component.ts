import { Component, OnInit } from '@angular/core';
import { User } from '../../model/interface/user';
import { UsersService } from '../../model/services/users.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'kf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[]
  apareceTable: boolean = true
  apareceForm: boolean = false
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  icon: string
  act: string
  search: string
  frmValid: any
  constructor(private service: UsersService) {
    this.icon = "person_add"
    this.service.getUsers()
      .subscribe(data => {
        this.users = data
        console.log(this.users)
      })
    this.frmValid = new FormGroup({
      namevalid: new FormControl("", Validators.required),
      lastvalid: new FormControl("", Validators.required),
      datevalid: new FormControl("", Validators.required),
      emailvalid: new FormControl("", Validators.email)
    })
  }

  ngOnInit() {}
  addUser(user?: User){
    this.showAddUser()
    const newUser: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      email: this.email,
      _id :this._id
    }
    if(this._id == undefined){
      this.service.newUser(newUser)
        .subscribe(data => {
          this.users.unshift(data)
          console.log(data)
        })
    }else{
      let users = this.users
      this.service.editUser(newUser)
        .subscribe(result => {
          if(result['success'] == true) {
            for (var i = 0; i < users.length; i++) {
              if( users[i]._id == newUser._id ){
                users[i] = newUser
              }
            }
          }
        })
    }
  }
  deleteUser(id){
    console.log(id)
    let response = confirm("¿Estas seguro de eliminar este registro?")
    const users = this.users;
    if(response){
      this.service.deleteUser(id)
        .subscribe(data => {
          console.log(data)
          if(data['success'] == true) {
            for (var i = 0; i < users.length; i++) {
              if(users[i]._id == id){
                users.splice(i, 1)
              }
            }
          }
        })
    }
  }
  editUser(user){
    this.showAddUser()
    console.log(user)
    this._id = user._id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.birthDate = user.birthDate
    this.email = user.email
    this.act = "active"
  }
  showAddUser(){
    this.apareceTable = (this.apareceTable) ?false:true
    this.apareceForm = (!this.apareceForm) ?true:false
    this.icon = (this.icon == "person_add") ? "navigate_before": "person_add"
  }
  edad = (fechaNacimient) => {
    let fechaNace: any = new Date(fechaNacimient)
    let fechaActual: any = new Date()

    let mes = fechaActual.getMonth();
    let dia = fechaActual.getDate();
    let año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    let edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
   
    return edad;
  }
}