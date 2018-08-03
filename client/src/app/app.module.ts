import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ROUTING } from './app.routing';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';

import { ChatService } from './services/chat.service';
import { LoginService } from './services/login.service';
import { InteractService } from './services/interact.service';



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    ProfileComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ROUTING
  ],
  providers: [ChatService, LoginService, InteractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
