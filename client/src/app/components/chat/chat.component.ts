import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { InteractService } from '../../services/interact.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild('chatHolder') private chatHolder: ElementRef;

    data: any = {};

    chatArray: Array<object> = [];
    message: string = '';

    moveScroll: boolean = false;
    onlineUsers: any = [];
    onlineUserList:boolean = false;
    olineUserListEnable:boolean = false;

    constructor(private chatService: ChatService, private interactService: InteractService, private router: Router) { }

    ngOnInit() {
        this.data = this.interactService.getData();
        if (!this.data.validUser) {
            this.router.navigateByUrl('login');
            return;
        }
        this.chatArray = this.data.chatArray;
        this.onlineUsers = this.data.onlineUsers;
        this.interactService.currentData.subscribe((res) => {
            if (res !== null && res.id === 'newmessage' && res.data === true) {
                this.moveScroll = true;
            } else {
                console.warn('currentData is =>', res);
            }
        });
        this.chatService.getAllUsers().subscribe((res) => {
            this.interactService.setData({ onlineUsers: res });
            this.onlineUsers = res;
        });
    }

    ngAfterViewChecked() {
        if (this.chatHolder !== undefined && this.moveScroll) {
            this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight;
        }
        this.moveScroll = false;
    }

    submitMessage(event: Event) {
        if (this.message.trim() === '') {
            alert('message field is empty');
            return;
        }
        this.chatService.sendNewMessage(this.message, this.data.username);
        this.message = '';
    }

    navigateTo(page: string) {
        if (page === 'profile') {
            this.interactService.setData({ profile_page_3: true });
        }
        this.router.navigateByUrl(page);
    }

    openCloseOnlineUsers(){
        this.olineUserListEnable = true;
        this.onlineUserList = !this.onlineUserList;
    }

    ngDestroy() {
        this.chatService.stopHeartBeat();
    }
}
