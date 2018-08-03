import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ChatComponent } from "./components/chat/chat.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { InfoComponent } from "./components/info/info.component";

const APP_ROUTES:Routes = [
    {path:"",redirectTo:"/login", pathMatch:'full'},
    {path:"login", component:LoginComponent},
    {path:"profile", component:ProfileComponent},
    {path:"chat", component:ChatComponent},
    {path:"info", component:InfoComponent}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
