import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookDetailsComponent} from "./book-details.component";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ]
})
export class BookDetailsModule { }
