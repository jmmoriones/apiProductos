import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OnInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../model/services/users.service';
import { Product } from '../../model/interface/product';
import { User } from '../../model/interface/user';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'kf-prduct',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit{
  //@ViewChild('fileInput') fileInput;
  products: Product[];
  users: User[];
  apareceTable: boolean = true;
  apareceForm: boolean = false;
  icon: string;
  nameProduct: string;
  precie: number;
  description: string;
  userId: string;
  user: any;
  fileInput: string;
  _id: string;
  act: string;
  buyer: string;
  private sub: any;
  frmRegistro: any;
  selectedFile: File=null;
  nameImage: string;
  domain: string = 'http://localhost:3000/products/';
  constructor(private route: ActivatedRoute, private server: UsersService) {
    this.user = []
    this.icon = "add_shopping_cart"
    this.frmRegistro = new FormGroup({
      productvalid: new FormControl("", Validators.required),
      pricevalid: new FormControl("", Validators.required),
      descriptionvalid: new FormControl("", Validators.required)
    })
    $(document).ready(function(){
      $('.modal').modal();
    });
    this.server.getUsers()
      .subscribe(result => {
        for (var i = 0; i < result.length; i++) {
          if(result[i]._id == this.userId){
            this.buyer = `${result[i].firstName} ${result[i].lastName}`;
            this.user = result[i]
          }
        }
      })
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id']
    })
    this.server.getUserProducts(this.userId)
      .subscribe(result => {
      this.products = result['products']
      console.log(this.products)
    })
  }
  showAddProduct(){
    this.apareceForm = (this.apareceForm) ? false: true
    this.apareceTable = (!this.apareceTable) ? true : false
    this.icon = (this.icon == "add_shopping_cart") ? "navigate_before": "add_shopping_cart"
  }
  saveProduct(){
    this.showAddProduct()
    if(this._id == undefined){
      let typeImage = this.selectedFile.type
      if(typeImage == 'image/jpeg' || typeImage == 'image/jpg'){
        this.nameImage = `photo-${Date.now()}.jpg`
      }else if(typeImage == 'image/png'){
        this.nameImage = `photo-${Date.now()}.png`
      }
      const newProduct: Product = {
        name: this.nameProduct,
        price: this.precie,
        description: this.description,
        photo: (this.nameImage==undefined) ? this.fileInput:this.nameImage
      }
      console.log(newProduct)
      this.server.newUserProduct(newProduct, this.userId)
        .subscribe(data => {
          this.products.unshift(data)
          console.log(data)
        })

      let fd = new FormData()
      fd.append('photo', this.selectedFile, this.nameImage)
      this.server.photo(fd)
       .subscribe(data => data)
    }else{
      let product = this.products
      const productUpdate = {
        name: this.nameProduct,
        price: this.precie,
        description: this.description,
        _id: this._id,
        photo: (this.nameImage==undefined) ? this.fileInput:this.nameImage
      }
      this.server.updateUserProduct(productUpdate)
        .subscribe(data => {
          if(data['success'] == true){
            for (var i = 0; i < product.length; i++) {
              if( product[i]._id == productUpdate._id ){
                product[i] = productUpdate
              }
            }
          }
        })
    }
  }
  editProduct(product: Product){
    this.showAddProduct()
    this.nameProduct = product.name,
    this.precie = product.price,
    this.description = product.description,
    this._id = product._id
    this.act = 'active'
    this.fileInput = product.photo
  }
  removeProduct(id, nameImage){
    let message = confirm('¿Estas seguro de eliminar este producto?')
    const product = this.products
    if(message){
      this.server.deleteUserProduct(id, nameImage)
        .subscribe(data => {
           if(data['success'] == true) {
            for (var i = 0; i < product.length; i++) {
              if(product[i]._id == id){
                product.splice(i, 1)
              }
            }
          }
        })
    }return
  }
  removeIdProduct(id){
    this.server.deleteProductUser(id, this.user._id)
        .subscribe(data => console.log(data))
  }
  popupUserInfo(event){event.preventDefault()}
  closeModal() {  $('.modal').close(); }
  onCahngedFile(event){
    this.selectedFile = <File>event.target.files[0]
    console.log(this.selectedFile)
  }
}