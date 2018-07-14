import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Product } from '../interface/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/Rx"

@Injectable()
export class UsersService {
  domain: String = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  getUsers () {
    return this.http.get<User[]>(`${this.domain}/users`)
      .map(data => data)
  }
  newUser(newUser: User){
    return this.http.post<User>(`${this.domain}/users`, newUser)
      .map(data => data)
  }
  deleteUser(id){
    return this.http.delete(`${this.domain}/users/${id}`)
      .map(data => data)
  }
  editUser(editUser: User) {
    return this.http.put<User>(`${this.domain}/users/${editUser._id}`, editUser)
      .map(data => data)
  }
  newUserProduct(product: Product, userId){
    return this.http.post<Product>(`${this.domain}/users/${userId}/product`, product)
      .map(data => data)
  }
  getUserProducts(userId){
    return this.http.get<Product[]>(`${this.domain}/users/${userId}/products`)
      .map(data => data)
  }
  updateUserProduct(product: Product){
    return this.http.put<Product>(`${this.domain}/users/${product._id}/product`, product)
      .map(data => data)
  }
  deleteUserProduct(id: string, namePhoto: string){
    return this.http.delete(`${this.domain}/users/${id}/${namePhoto}/product`)
      .map(data => data)
  }
  deleteProductUser(idProduct: string, _id: string){
    console.log({product: idProduct, user: _id})
    return this.http.put(`${this.domain}/users/${idProduct}/productDelete`, {_id})
      .map(data => data)
  }
  photo(ft){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    return this.http.post(`${this.domain}/users/foto`, ft, {headers: headers})
      .map(res => res)
  }
}
