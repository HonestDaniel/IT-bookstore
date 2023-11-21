import {Component, ViewChild} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {Book} from "../../shared/interfaces/book.interface";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  displayedColumns: string[] = ['#', 'Title', 'Price', 'Quantity'];
  dataSource: MatTableDataSource<{book: Book, quantity: number}>;
  booksInCart: {book: Book, quantity: number}[] = []

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.booksInCart = this.cartService.getCartItems()
    this.dataSource = new MatTableDataSource(this.booksInCart)

    this.dataSource.filterPredicate = (booksInCart: {book: Book, quantity: number}, filter: string) => {
      return booksInCart.book.title.toLowerCase().includes(filter);
    };

  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCartTotal(): string  {
    const total = this.booksInCart.reduce((acc: number, item: { book: Book, quantity: number }) => {
      const priceString = item.book.price.replace('$', ''); // Удаление символа "$"
      const priceNumber = parseFloat(priceString);
      return acc + (priceNumber * item.quantity);
    }, 0);

    return '$'+total.toFixed(2);
  }

}
