import {Component, OnInit, ViewChild} from '@angular/core';
import {Book, Data} from "../../../../shared/interfaces/book.interface";
import {BooksService} from "../../../../shared/services/books.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CartService} from "../../../../shared/services/cart.service";

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  displayedColumns: string[] = ['#', 'Title', 'Price', 'Buy']
  dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  books: Book[] = [];

  cartItems: { book: Book, quantity: number }[];

  constructor(
    private booksService: BooksService,
    private cartService: CartService
    ) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data: Data) => {
      this.books = data.books;
      this.dataSource = new MatTableDataSource(data.books)

      this.dataSource.filterPredicate = (books: Book, filter: string) => {
        return books.title.toLowerCase().includes(filter);
      };

      this.dataSource.paginator = this.paginator;

      this.cartService.cartItems$.subscribe(cartItems => {
        this.updateCartItems(cartItems);
      })
    })
  }

  updateCartItems(cartItems: { book: Book, quantity: number }[]) {
    this.cartItems = [...cartItems];
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCartQuantity(book: Book): number {
    const cartItem = this.cartItems.find(item => item.book.isbn13 === book.isbn13);
    return cartItem ? cartItem.quantity : 0;
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
  }

}
