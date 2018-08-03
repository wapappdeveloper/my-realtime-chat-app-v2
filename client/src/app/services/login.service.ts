import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './chat.service';

@Injectable()
export class LoginService {

  constructor(private chatService:ChatService) { }

  login(obj:any):Observable<any>{
    let observable = new Observable(observer=>{
      if(obj.quickChat){
        this.chatService.sendNewUser(obj.username, (res)=>{
          observer.next(res);
        });
      }else{
        console.info('High Level Chat is under progress, please use quick chat');
      }
    });
    return observable;
  }

}
