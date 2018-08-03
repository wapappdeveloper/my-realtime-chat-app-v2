import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  data:any = {};
  constructor(private router: Router, private interactService:InteractService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    if(!this.data.validUser){
      this.router.navigateByUrl('login');
      return;
    }
  }

  openInNewTab() {
    window.open("http://jpleoleo.webs.com/", "_blank");
  }

  navigateTo(page?: string) {
    if(page===null || page===undefined){
      if(this.data.validUser){
        this.router.navigateByUrl('chat');
      }else{
        console.error('page data is invalid', page);
      }
    }else{
      this.router.navigateByUrl(page);
    }
    
  }

}
