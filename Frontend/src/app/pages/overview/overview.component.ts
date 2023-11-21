import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../shared/services/books.service";
import {Book, Data} from "../../shared/interfaces/book.interface";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  ngOnInit(): void{
  }

}
