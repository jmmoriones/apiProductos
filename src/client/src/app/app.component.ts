import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from './model/interface/user'
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'kf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'kf';
  numbweNotification: number = 0;
  socket: SocketIOClient.Socket;
  myNotifications: User[]=[];
  user: User;
  constructor(){
    this.socket = io('http://localhost:3000')
  }
  ngOnInit(){
    let audio = document.createElement('audio')
    audio.setAttribute('src', '../assets/alert.mp3')
    $('.space-notification').hover(function(){
        $('.space-notification').attr('data-content','1');
        console.log(this)
    });
    this.socket.on('receive:user', data => {
      this.numbweNotification = this.numbweNotification + 1;
      audio.play()

      this.myNotifications.unshift(data)
    })
    $(document).ready(function(){
      $('.modal').modal();
    });
  }
  linkNotification(e){
    e.preventDefault()
    $('.notice-notification').toggleClass('view-notification')
    this.numbweNotification = 0;
  }
  showNotification(ntf: User){
    this.user = ntf
  }
}
