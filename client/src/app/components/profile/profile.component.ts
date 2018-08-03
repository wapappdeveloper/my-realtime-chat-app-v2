import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  page_1:boolean = false;
  page_2:boolean = false;
  page_3:boolean = false;
  page_4:boolean = false;

  data:any = {};
  constructor(private router:Router, private interactService:InteractService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    if(!this.data.validUser){
      this.router.navigateByUrl('login');
      return;
    }
    if(this.data.quickChat){
      if(this.data.profile_page_3){
        this.data.profile_page_3 = false;
        this.page_1 = this.page_2 = this.page_4 = false;
        this.page_3 = true;
      }else if(this.data.profile_page_4){
        this.data.profile_page_4 = false;
        this.page_1 = this.page_2 = this.page_3 = false;
        this.page_4 = true;
      }else{
        this.page_1 = this.page_2 = this.page_4 = false;
        this.page_3 = true;
      }
      this.interactService.setData({profile_page_3:false, profile_page_4:false});
    }else{
      console.info('High level Chat is in progress');
    }
  }
  
  movePage(pageNo:number){
    switch(pageNo){
      case 1:this.page_2 = this.page_3 = false; this.page_1 = true; break;
      case 2:this.page_1 = this.page_3 = false; this.page_2 = true; break;
      case 3:this.page_1 = this.page_2 = false; this.page_3 = true; break;
      default : this.page_1 = true; break;
    }
  }

  navigateTo(page:string){
    this.router.navigateByUrl(page);
  }
}

