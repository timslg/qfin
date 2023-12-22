import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        LandingComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
