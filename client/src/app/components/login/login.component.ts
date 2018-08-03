import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output('emitter') private emitter:EventEmitter<any> = new EventEmitter;
  data:any = {};
  private password:string = '';
  constructor(private chatService: ChatService, private loginService: LoginService, private router: Router, private interactService: InteractService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    if(this.data.validUser){
      this.router.navigateByUrl('chat');
      return;
    }
  }

  submit() {
    if ((this.data.username).trim() == '' || (this.password).trim() == '' && !this.data.quickChat) {
      alert('some fields are empty');
      return;
    }
    this.loginService.login({username:this.data.username, password:this.password, quickChat:this.data.quickChat}).subscribe((res) => {
      if (res) {
        this.interactService.setData({validUser:res});
        //this.emitter.emit({res:res});
        this.interactService.changeData({id:'login', data:true});
      } else {
        this.password = '';
        this.data.username = '';
        this.interactService.setData({username:this.data.username});
        console.error('This USERNAME is already taken, Please try another');
        alert('This USERNAME is already taken, Please try another');
      }
    });
  }

  navigateTo(page: string) {
    this.router.navigateByUrl(page);
  }
}
